import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Bars extends Component {
  state = {
    count: 0
  };

  incrementBarCount = () => {
    console.log('clicked');
    this.setState(prevState => {
      return { count: (prevState.count += 1) };
    });
  };

  render() {
    return (
      <div className="Bars">
        <h3>I am a Bars</h3>
        <p>How many??</p>
        <button onClick={this.incrementBarCount}>MOAR!</button>
        <p>{this.state.count}</p>
        <Link to="/">Back</Link>
      </div>
    );
  }
}
