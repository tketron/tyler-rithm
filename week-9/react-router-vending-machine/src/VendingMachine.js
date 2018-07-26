import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class VendingMachine extends Component {
  render() {
    return (
      <div className="VendingMachine">
        <h3>I am a vending machine</h3>
        <div className="VendingMachine-snacks">
          <Link to="/ice">Ice</Link>
          <Link to="/bars">Bars</Link>
          <Link to="/lacroix">La Croix</Link>
        </div>
      </div>
    );
  }
}
