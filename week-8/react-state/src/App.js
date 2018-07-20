import React, { Component } from 'react';
import './App.css';
import Container from './Container';
import CoinFlipGame from './CoinFlipGame';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Container numSquares={40} />
        <CoinFlipGame />
      </div>
    );
  }
}

export default App;
