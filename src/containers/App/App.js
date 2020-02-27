import React, { Component } from 'react';
import './App.scss';
import { apiCall } from '../../utils/fetchCalls';
import Piece from '../../components/Piece/Piece';

class App extends Component {
  constructor() {
    super();
    this.state = {
      works: {},
      test: false
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

  componentDidMount() {
    //take object from data fetch, check it's returning, then try restructure through destr. 
    //to new obj for store assignment 
    this.retrieveArtPiece()
    .then(piece => {
      this.setState({works: piece, test: true})
    })
  }

  render() {
    return (
      <div className="App">
        {this.state.test && <Piece {...this.state.works} />}
      </div>
    );
  }
}

export default App;
