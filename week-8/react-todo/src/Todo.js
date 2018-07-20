import React, { Component } from 'react';

export default class Todo extends Component {
  render() {
    return (
      <div className="Todo">
        <p>{this.props.msg}</p>
      </div>
    );
  }
}
