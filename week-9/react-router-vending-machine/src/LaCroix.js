import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class LaCroix extends Component {
  render() {
    return (
      <div className="LaCroix">
        <h3>I am a LaCroix</h3>
        <Link to="/">Back</Link>
      </div>
    );
  }
}
