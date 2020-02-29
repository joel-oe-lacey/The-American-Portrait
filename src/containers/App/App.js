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
  retrieveInitialCollection = async () => {
    const collection = await apiCall('https://api.harvardartmuseums.org/object?apikey=b59b0050-58c4-11ea-b831-f76084e9f972&hasimage=1&place=2028429&classification=17&culture=American&size=100&sort=dateend&sortorder=desc')

    const rawCollectionResp = await collection.json();

    const structuredCollectionData = rawCollectionResp.records.reduce((restrCollection, item) => {
      restrCollection.push(restructureArtPiece(item))
      return restrCollection;
    }, [])

    this.props.loadCollectionToStore(structuredCollectionData)
    // console.log('firstCollResp', rawCollectionResp.info.pages > 1)
    if (rawCollectionResp.info.pages > 1) {
      this.retrieveSubseqCollections(rawCollectionResp)
    }
  }

  retrieveSubseqCollections = async (prevCollection) => {
    const collection = await apiCall(`${prevCollection.info.next}`)

    const rawCollectionResp = await collection.json();

    const structuredCollectionData = rawCollectionResp.records.reduce((restrCollection, item) => {
      restrCollection.push(restructureArtPiece(item))
      return restrCollection;
    }, []);

    this.props.loadSubsqCollectionToStore(structuredCollectionData);
    if (rawCollectionResp.info.page !== rawCollectionResp.info.pages) {
      this.retrieveSubseqCollections(rawCollectionResp)
    }
  }


  componentDidMount() {
    this.retrieveInitialCollection()
  }

  render() {
    return (
      <div className="App">
        {!this.props.collections.length && <Loading />}
        <Route exact path="/" render={() => {
          return (
            this.props.collections.length && <Timeline collection={this.props.collections} />
        )}} />
        <Route exact path='/piece/:id' render={({ match }) => {
          const artPiece = this.props.collections.collection.find(piece => piece.objectid === parseInt(match.params.id))
          return (
            <section className="App">
              {!this.props.collections.collection.length && <Loading />}
              {this.props.collections.collection.length && <Piece {...artPiece} />}
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


