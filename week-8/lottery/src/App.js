import React, { Component } from 'react';
import './App.css';
import Lottery from './Lottery';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Lottery />
        <Lottery numberOfBalls={4} />
      </div>
    );
  }
}

export default App;
