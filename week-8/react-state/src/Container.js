import React, { Component } from 'react';
import './Container.css';
import Square from './Square';

class Container extends Component {
  static defaultProps = {
    numSquares: 24
  };

  render() {
    return (
      <div className="Container">
        {Array.from({ length: this.props.numSquares }).map(i => <Square />)}{' '}
      </div>
    );
  }
}

export default Container;
