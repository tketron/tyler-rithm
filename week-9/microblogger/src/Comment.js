import React, { Component } from 'react';

class Comment extends Component {
  render() {
    return <div> {this.props.text}</div>;
  }
}

export default Comment;
