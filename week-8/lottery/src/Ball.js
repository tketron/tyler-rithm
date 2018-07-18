import React, { Component } from 'react';
import './Ball.css';

class Ball extends Component {
  state = {
    active: false
  };

  changeColor() {
    this.setState({
      active: !this.state.active
    });
  }

  render() {
    return (
      <span
        onClick={e => this.changeColor()}
        className={`Ball
        ${this.state.active ? 'Ball-closed' : 'Ball-open'}`}
      >
        {this.props.value}
      </span>
    );
  }
}

export default Ball;
