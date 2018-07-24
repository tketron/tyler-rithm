import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';

const Welcome = props => {
  return (
    <div>
      <h1>hello world!</h1>
    </div>
  );
};

const About = props => {
  return (
    <div>
      <h1>What about react router??</h1>
      <Link to="/">Go back home</Link>
    </div>
  );
};

const Contact = props => {
  return <h1>No contact, I'm a hermit.</h1>;
};

const Secret = props => {
  return (
    <div>
      <img src={props.gif} />
    </div>
  );
};

const Topics = props => {
  const stuff = ['politics', 'sports', 'music', 'coding'];
  return (
    <div>
      {stuff.map(t => (
        <div key={t}>
          <Link to={`/topics/${t}`}>{t}</Link>
        </div>
      ))}
      {stuff.map(t => (
        <Route
          key={t}
          exact
          path={`/topics/${t}`}
          component={props => <h1>{`The topic is ${t}`}</h1>}
        />
      ))}
    </div>
  );
};

class App extends Component {
  render() {
    return (
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/contact">Contact</Link>
          </li>
          <li>
            <Link to="topics">Topics</Link>
          </li>
        </ul>
        <Route exact path="/" component={Welcome} />
        <Route path="/about" component={About} />
        <Route path="/contact" component={Contact} />
        <Route path="/topics" component={Topics} />
        {/* Passing down props through Routes */}
        <Route
          path="/secret"
          component={routeProps => (
            <Secret
              gif="https://media.giphy.com/media/kTBjwh6IWbLPy/giphy.gif"
              {...routeProps}
            />
          )}
        />
      </div>
    );
  }
}

export default App;
