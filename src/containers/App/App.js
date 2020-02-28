import React, { Component } from 'react';
import './App.scss';
import { apiCall } from '../../utils/fetchCalls';
import Piece from '../../components/Piece/Piece';
import Timeline from '../../components/Timeline/Timeline';
import { loadRegions } from '../../actions';
import { connect } from 'react-redux';
import { restructureArtPiece } from '../../utils/helpers';
import { loadCollection } from '../../actions';

export class App extends Component {
  constructor() {
    super();
    this.state = {
      collection: []
    }
  }

  retrieveArtPiece = async () => {
    const piece = await apiCall('https://api.harvardartmuseums.org/object/303389?apikey=b59b0050-58c4-11ea-b831-f76084e9f972')

    const {
      title,
      titles,
      objectid,
      description,
      provenance,
      commentary,
      labeltext,
      classification,
      creditline,
      century,
      culture,
      medium,
      videos,
      datebegin,
      dateend,
      dated,
      period,
      technique,
      colors,
      primaryimageurl,
      images,
    } = await piece.json();

    const restrPiece = {
      title,
      titles,
      objectid,
      description,
      provenance,
      commentary,
      labeltext,
      classification,
      creditline,
      century,
      culture,
      medium,
      videos,
      datebegin,
      dateend,
      dated,
      period,
      technique,
      colors,
      primaryimageurl,
      images
    }

    return restrPiece
  }

  retrieveCollection = async () => {
    const collection = await apiCall('https://api.harvardartmuseums.org/object?apikey=b59b0050-58c4-11ea-b831-f76084e9f972&place=2029730&q=classificationid:30&size=30')

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
        {this.state.collection.length && <Timeline collection={this.state.collection}/>}
        {/* <Carousel /> */}
        {/* {this.state.test && <Piece {...this.state.works} />} */}
        {/* import Piece and pull art piece out of store using ID */}
      </div>
    );
  }
}

export const mapDispatchToProps = dispatch => ({
  loadRegionsToStore: (regions) => { dispatch(loadRegions(regions)) },
  loadCollectionToStore: (collection) => { dispatch(loadCollection(collection)) }
});

export default connect(null, mapDispatchToProps)(App)


