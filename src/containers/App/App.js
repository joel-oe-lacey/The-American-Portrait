import React, { Component } from 'react';
import './App.scss';
import { apiCall } from '../../utils/fetchCalls';
import Piece from '../../components/Piece/Piece';
import Loading from '../../components/Loading/Loading';
import Timeline from '../../components/Timeline/Timeline';
import { loadRegions } from '../../actions';
import { connect } from 'react-redux';
import { restructureArtPiece, bucketArtByDate } from '../../utils/helpers';
import { loadCollection, loadSubsqCollection } from '../../actions';
import { Route, Switch } from 'react-router-dom';

export class App extends Component {
  constructor() {
    super();
    this.state = {
      fetchComplete: false
    }
  }

  retrieveInitialCollection = async () => {
    //impliment base query here, future queries will build dynamically
    const collection = await apiCall('https://api.harvardartmuseums.org/object?apikey=b59b0050-58c4-11ea-b831-f76084e9f972&hasimage=1&place=2028429&classification=17&culture=American&size=100&sort=dateend&sortorder=desc')
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
      this.setState({fetchComplete: true})
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

  //need to run through bucketing after collection has fired off
  //but need to account for async completion 
  componentDidMount() {
    this.retrieveInitialCollection()
  }

  render() {
    const collection = this.props.collections;
    const fetchComplete = this.state.fetchComplete;

    return (
      <div className="App">
        {!fetchComplete && <Loading />}
        <Route exact path="/" render={() => {
          return (
            fetchComplete && <Timeline />
        )}} />
        <Route exact path='/piece/:id' render={({ match }) => {
          const artPiece = collection.find(piece => piece.objectid === parseInt(match.params.id))
          return (
            <section className="App">
              {!fetchComplete && <Loading />}
              {fetchComplete && <Piece {...artPiece} />}
            </section>
          )
        }} />
      </div>
    );
  }
}

export const mapDispatchToProps = dispatch => ({
  loadRegionsToStore: (regions) => { dispatch(loadRegions(regions)) },
  loadCollectionToStore: (collection) => { dispatch(loadCollection(collection)) },
  loadSubsqCollectionToStore: (collection) => { dispatch(loadSubsqCollection(collection)) }
});

export const mapStateToProps = state => ({
  collections: state.collections,
});

export default connect(mapStateToProps, mapDispatchToProps)(App)


