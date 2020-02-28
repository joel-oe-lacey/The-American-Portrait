import React, { Component } from 'react';
import './App.scss';
import { apiCall } from '../../utils/fetchCalls';
import Piece from '../../components/Piece/Piece';
import Loading from '../../components/Loading/Loading';
import Timeline from '../../components/Timeline/Timeline';
import { loadRegions } from '../../actions';
import { connect } from 'react-redux';
import { restructureArtPiece } from '../../utils/helpers';
import { loadCollection } from '../../actions';
import { Route, Switch } from 'react-router-dom';

export class App extends Component {
  constructor() {
    super();
    this.state = {
      collection: []
    }
  }

  retrieveCollection = async () => {
    const collection = await apiCall('https://api.harvardartmuseums.org/object?apikey=b59b0050-58c4-11ea-b831-f76084e9f972&q=contextualtextcount:1&hasimage=1')

    const rawCollectionResp = await collection.json();

    const structuredCollectionData = rawCollectionResp.records.reduce((restrCollection, item) => {
      restrCollection.push(restructureArtPiece(item))
      return restrCollection;
    }, [])

    return structuredCollectionData;
  }

  componentDidMount() {
    this.retrieveCollection()
      .then(collectionData => {
        this.setState({ collection: collectionData })
        this.props.loadCollectionToStore(collectionData)
      })
  }

  render() {
    return (
      <div className="App">
        {!this.state.collection.length && <Loading />}
        <Route exact path="/" render={() => {
          return (
              this.state.collection.length && <Timeline collection={this.state.collection} />
        )}} />
        <Route exact path='/piece/:id' render={({ match }) => {
          const artPiece = this.state.collection.find(piece => piece.objectid === parseInt(match.params.id))
          return (
            <section className="App">
              {!this.state.collection.length && <Loading />}
              {this.state.collection.length && <Piece {...artPiece} />}
            </section>
          )
        }} />
      </div>
    );
  }
}

export const mapDispatchToProps = dispatch => ({
  loadRegionsToStore: (regions) => { dispatch(loadRegions(regions)) },
  loadCollectionToStore: (collection) => { dispatch(loadCollection(collection)) }
});

export default connect(null, mapDispatchToProps)(App)


