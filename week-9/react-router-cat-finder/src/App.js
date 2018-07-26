import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import { Route, Switch, Redirect, Link } from 'react-router-dom';

const CatList = props => {
  console.log('cats list');
  return (
    <div>
      <Link to="/cats/cora">Cora</Link>
      <Link to="/cats/katie">Katie</Link>
      <Link to="/cats/carl">Carl</Link>
      <Route path="/cats/:name" component={Cat} />
    </div>
  );
};

const Cat = props => {
  console.log(JSON.stringify(props));
  const catFacts = {
    Cora: [
      'Cora loves attention',
      'Cora likes to kill butterflies',
      'Cora is actually a dog'
    ],
    Katie: [
      'Katie is a natural predator',
      'Katie is one of a kind',
      'Katie is reserved and dignified'
    ],
    Carl: [
      'Carl loves getting dirty',
      'Carl is a snuggle monster',
      'Carl has a very petite meow'
    ]
  };
  // let name = new URLSearchParams(props.match.params).get('name');
  let name = props.match.params.name;
  name = name.charAt(0).toUpperCase() + name.substr(1);
  return (
    <div>
      <p>The cat is {name}</p>
      <ul>{catFacts[name].map((f, idx) => <li key={idx}>{f}</li>)}</ul>
    </div>
  );
};

class App extends Component {
  render() {
    return (
      <div className="App">
        <Switch>
          <Route path="/cats" component={CatList} />
          <Redirect to="/cats" />
        </Switch>
      </div>
    );
  }
}

export default App;
