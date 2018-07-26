import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Switch, Redirect } from 'react-router-dom';

//mock authentication object
const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    this.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    this.isAuthenticated = false;
    setTimeout(cb, 100); // fake async
  }
};

const Home = props => {
  return (
    <div>
      <h1>Homepage</h1>
      {/* <Route
        exact
        path="/taco"
        component={props => <small>nested routes work!</small>}
      /> */}
    </div>
  );
};

const About = props => {
  return <h1>About</h1>;
};

const Login = props => {
  return (
    <div>
      <h1>Login</h1>
    </div>
  );
};

const Protected = props => (
  <h1>This is a secret protected component that requires authentication.</h1>
);

const PrivateRoute = ({ component: Component, ...rest }) => {
  console.log(`Component: ${Component}, Rest: ${JSON.stringify(rest)}`);
  return (
    <Route
      {...rest}
      render={props =>
        fakeAuth.isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

const NotFound = props => {
  return (
    <h1>{`${props.location.pathname} is not a valid route for this app`}</h1>
  );
};

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
          <Route exact path="/login" component={Login} />
          <PrivateRoute exact path="/protected" component={Protected} />
          <Route component={NotFound} />
          {/* <Redirect to="/" /> */}
        </Switch>
      </div>
    );
  }
}

export default App;
