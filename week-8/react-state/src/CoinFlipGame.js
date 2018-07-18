import React, { Component } from 'react';
import './CoinFlipGame.css';
import Coin from './Coin';

class CoinFlipGame extends Component {
  state = {
    currentValue: -1,
    totalFlips: 0,
    heads: 0,
    tails: 0
  };

  flipCoin() {
    //Get random value
    const val = Math.round(Math.random());

    if (val === 1) {
      //count as heads
      this.setState({
        heads: this.state.heads + 1
      });
    } else {
      this.setState({
        tails: this.state.tails + 1
      });
    }
    this.setState({
      currentValue: val,
      totalFlips: this.state.totalFlips + 1
    });
  }

  getPercentage(numerator, divisor) {
    return Number.parseFloat((numerator / divisor) * 100).toFixed(2);
  }

  render() {
    return (
      <div className="CoinFlipGame">
        <h2>Flip a coin!</h2>
        <Coin value={this.state.currentValue} />
        <button onClick={e => this.flipCoin()}>Flip.It</button>
        <p>{`Out of ${this.state.totalFlips}, there have been ${
          this.state.heads
        } heads and ${this.state.tails} tails.`}</p>
        <p>
          ({this.state.totalFlips
            ? this.getPercentage(this.state.heads, this.state.totalFlips)
            : 0}% heads,{' '}
          {this.state.totalFlips
            ? this.getPercentage(this.state.tails, this.state.totalFlips)
            : 0}% tails)
        </p>
      </div>
    );
  }
}

export default CoinFlipGame;
