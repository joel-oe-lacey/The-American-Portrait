import React, { Component } from 'react';
import { apiCall } from '../../utils/fetchCalls';
import { connect } from 'react-redux';
import { restructureArtPiece, bucketArtByDate } from '../../utils/helpers';
import { loadCollection, loadSubsqCollection } from '../../actions';
import Loading from '../Loading/Loading';
import { Redirect } from 'react-router-dom';

export class Region extends Component {
    constructor() {
        super();
        this.state = {
            fetchComplete: false
        }
    }

    retrieveInitialCollection = async () => {
        const region = await apiCall(`https://api.harvardartmuseums.org/place?apikey=b59b0050-58c4-11ea-b831-f76084e9f972&size=100&q=name:${this.props.region}`)
        const regionResp = await region.json();
        const regionID = regionResp.records.length ? regionResp.records[0].id : 0;
        const collection = await apiCall(`https://api.harvardartmuseums.org/object?apikey=b59b0050-58c4-11ea-b831-f76084e9f972&hasimage=1&place=${regionID}&classification=17&culture=American&size=100&sort=dateend&sortorder=desc`)
        const rawCollectionResp = await collection.json();
        const structuredCollectionData = rawCollectionResp.records.reduce((restrCollection, item) => {
            if (item.primaryimageurl && item.dateend) {
                restrCollection.push(restructureArtPiece(item))
            }
            return restrCollection;
        }, [])
        this.props.loadCollectionToStore(structuredCollectionData)
        if (rawCollectionResp.info.pages > 1) {
            this.retrieveSubseqCollections(rawCollectionResp)
        } else {
            const bucketedCollection = bucketArtByDate(structuredCollectionData);
            this.props.loadCollectionToStore(bucketedCollection);
            this.setState({ fetchComplete: true })
        }
    }

    retrieveSubseqCollections = async (prevCollection) => {
        const collection = await apiCall(`${prevCollection.info.next}`)
        const rawCollectionResp = await collection.json();
        const structuredCollectionData = rawCollectionResp.records.reduce((restrCollection, item) => {
            if (item.primaryimageurl && item.dateend) {
                restrCollection.push(restructureArtPiece(item))
            }
            return restrCollection;
        }, []);
        this.props.loadSubsqCollectionToStore(structuredCollectionData);
        if (rawCollectionResp.info.page !== rawCollectionResp.info.pages) {
            this.retrieveSubseqCollections(rawCollectionResp)
        } else {
            const finalCollection = this.props.collections;
            const bucketedCollection = bucketArtByDate(finalCollection);
            this.props.loadCollectionToStore(bucketedCollection);
            this.setState({ fetchComplete: true })
        }
    }

    componentDidMount() {
        this.retrieveInitialCollection(this.props.region)
    }

    render() {
        const { fetchComplete } = this.state;
        if (fetchComplete) {
            return <Redirect to="/timeline" />
        } else {
            return <Loading />
        }
    }
}

export const mapDispatchToProps = dispatch => ({
    loadCollectionToStore: (collection) => { dispatch(loadCollection(collection)) },
    loadSubsqCollectionToStore: (collection) => { dispatch(loadSubsqCollection(collection)) }
});

export const mapStateToProps = state => ({
    region: state.region,
    collections: state.collections
});

export default connect(mapStateToProps, mapDispatchToProps)(Region)


