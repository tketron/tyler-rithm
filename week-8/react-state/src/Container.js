import React, { Component } from 'react';
import './Container.css';
import Square from './Square';

class Container extends Component {
  // constructor(props) {
  //   super(props);
  // }

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
