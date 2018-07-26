import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Ice extends Component {
  render() {
    return (
      <div className="Ice">
        <h3>I am a Ice</h3>
        <Link to="/">Back</Link>
      </div>
    );
  }
}
