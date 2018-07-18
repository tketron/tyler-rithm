import React, { Component } from 'react';
import './Coin.css';
import heads from './us-half-cent-front.jpg';
import tails from './us-half-cent-back.jpg';

class Coin extends Component {
  render() {
    let imageSrc = '';
    if (this.props.value === 1) {
      imageSrc = heads;
    } else if (this.props.value === 0) {
      imageSrc = tails;
    }

    return (
      <div className="Coin">
        <img src={imageSrc} />
      </div>
    );
  }
}

export default Coin;
