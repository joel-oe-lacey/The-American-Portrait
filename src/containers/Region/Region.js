import React, { Component } from 'react';
import { apiCall } from '../../utils/fetchCalls';
import { connect } from 'react-redux';
import { bucketArtByDate, recompileCollection, checkRecordDataAvailability } from '../../utils/helpers';
import { loadCollection, loadSubsqCollection } from '../../actions';
import Loading from '../../components/Loading/Loading';
import { Redirect } from 'react-router-dom';
import { stateMap } from '../../utils/referenceData';


export class Region extends Component {
    constructor() {
        super();
        this.state = {
            fetchComplete: false
        }
    }

    retrieveInitialCollection = async () => {
        const regionID = stateMap[this.props.region];
        const collection = await apiCall(`https://api.harvardartmuseums.org/object?apikey=b59b0050-58c4-11ea-b831-f76084e9f972&hasimage=1&place=${regionID}&classification=17&culture=American&size=100&sort=dateend&sortorder=desc`)
        const rawCollectionResp = await collection.json();
        const validCollectionData = checkRecordDataAvailability(rawCollectionResp);
        this.props.loadCollectionToStore(validCollectionData)
        if (rawCollectionResp.info.pages > 1) {
            //pass through whole collection response for pagination step through
            this.retrieveSubseqCollections(rawCollectionResp)
        } else {
            const bucketedCollection = bucketArtByDate(validCollectionData);
            const recompileBucket = recompileCollection(bucketedCollection);
            this.props.loadCollectionToStore(recompileBucket);
            this.setState({ fetchComplete: true })
        }
    }

    retrieveSubseqCollections = async (prevCollection) => {
        const collection = await apiCall(`${prevCollection.info.next}`)
        const rawCollectionResp = await collection.json();
        const validCollectionData = checkRecordDataAvailability(rawCollectionResp);
        this.props.loadSubsqCollectionToStore(validCollectionData);
        if (rawCollectionResp.info.page !== rawCollectionResp.info.pages) {
            this.retrieveSubseqCollections(rawCollectionResp)
        } else {
            const finalCollection = this.props.collections;
            const bucketedCollection = bucketArtByDate(finalCollection);
            const recompileBucket = recompileCollection(bucketedCollection);
            this.props.loadCollectionToStore(recompileBucket);
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


