import React, { Component } from 'react';
import './App.css';
import FetchAtomFeed from './containers/FetchAtomFeed/FetchAtomFeed'

class App extends Component {
  render() {
    return (
      <div className="App">
          <FetchAtomFeed/>
      </div>
    );
  }
}

export default App;
