import React, { Component } from 'react';

class Box extends Component {
  render() {
    const divStyle = {
      backgroundColor: this.props.backgroundColor,
      width: this.props.width,
      height: this.props.height
    };
    return <div style={divStyle} />;
  }
}

export default Box;
