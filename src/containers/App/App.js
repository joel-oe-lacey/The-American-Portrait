import React, { Component } from 'react';
import './App.scss';
import Piece from '../../components/Piece/Piece';
import Loading from '../../components/Loading/Loading';
import { connect } from 'react-redux';
import { Route, Switch } from 'react-router-dom';
import Timeline from '../Timeline/Timeline';
import About from '../About/About';
import Invalid from '../Invalid/Invalid';
import Region from '../Region/Region';

export class App extends Component {
  render() {
    const collection = this.props.collections;

    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={About} />
          <Route exact path="/region" component={Region} />
          <Route exact path="/timeline" component={Timeline} />
          <Route exact path='/piece/:id' render={({ match }) => {
            const artPiece = collection.find(piece => piece.objectid === parseInt(match.params.id))
            return (
              <section className="App">
                {!collection.length && <Loading />}
                {collection.length && <Piece {...artPiece} />}
              </section>
            )
          }} />
          <Invalid />
        </Switch>
      </div>
    );
  }
}

export const mapStateToProps = state => ({
  collections: state.collections,
});

export default connect(mapStateToProps)(App)


