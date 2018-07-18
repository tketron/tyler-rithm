import React, { Component } from 'react';
import Ball from './Ball';
import './Lottery.css';

class Lottery extends Component {
  constructor(props) {
    super(props);
    this.state = {
      values: Array.from({ length: props.numberOfBalls }).map(this.getRandomVal)
    };
  }

  //Set default properties
  static defaultProps = {
    numberOfBalls: 6
  };

  getRandomVal() {
    return Math.floor(Math.random() * 89) + 10;
  }

  chooseValues() {
    this.setState({
      values: Array.from({ length: this.props.numberOfBalls }).map(
        this.getRandomVal
      )
    });
  }

  render() {
    return (
      <div className="Lottery">
        <p id="Lottery-title">Today's Winners: </p>
        {this.state.values.map(val => <Ball value={val} />)}
        <button id="Lottery-draw-btn" onClick={e => this.chooseValues()}>
          Draw!
        </button>
      </div>
    );
  }
}

export default Lottery;
