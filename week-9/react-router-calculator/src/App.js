import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Route } from 'react-router-dom';

/**
 * Component to perform simple arithmetic calculations using query parameters
 * @param {*} props
 */
const Calculator = props => {
  // Destructure parameters
  const { operation, num1, num2 } = props.match.params;
  // Object containing basic arithmetic functions
  const calc = {
    add: (a, b) => a + b,
    subtract: (a, b) => a - b,
    divide: (a, b) => a / b,
    multiply: (a, b) => a * b
  };
  // Object containing the symbol version of the supported artihmetic operations
  const symbol = {
    add: '+',
    subtract: '-',
    divide: '/',
    multiply: '*'
  };
  // Test if parameter is a valid operation
  if (calc[operation]) {
    const result = calc[operation](+num1, +num2);
    return (
      <div>
        <h2>{`The result of ${num1} ${
          symbol[operation]
        } ${num2} is ${result}`}</h2>
      </div>
    );
  } else {
    return (
      <div>
        <h2>Not a valid operation!</h2>
      </div>
    );
  }
};

class App extends Component {
  render() {
    return (
      <div className="App">
        <Route path="/:operation/:num1/:num2" component={Calculator} />
      </div>
    );
  }
}

export default App;
