import React, { Component } from 'react';
import './Square.css';

class Square extends Component {
  state = {
    color: this.getRandomColor()
  };

  getRandomColor() {
    const red = Math.floor(Math.random() * 255);
    const green = Math.floor(Math.random() * 255);
    const blue = Math.floor(Math.random() * 255);
    return `rgb(${red}, ${blue}, ${green})`;
  }

  changeColor() {
    this.setState({
      color: this.getRandomColor()
    });
  }

  render() {
    return (
      <div
        onClick={e => this.changeColor()}
        style={{ backgroundColor: this.state.color }}
        className="Square"
      />
    );
  }
}

export default Square;
