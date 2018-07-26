import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import VendingMachine from './VendingMachine';
import Bars from './Bars';
import LaCroix from './LaCroix';
import Ice from './Ice';
import { Route, Link } from 'react-router-dom';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route path="/bars" component={Bars} />
        <Route path="/lacroix" component={LaCroix} />
        <Route path="/ice" component={Ice} />
        <Route exact path="/" component={VendingMachine} />
      </div>
    );
  }
}

export default App;
