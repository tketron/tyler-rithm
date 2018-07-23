import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import JokeList from './JokeList';
// import Joke from './Joke';
import axios from 'axios';

class App extends Component {
  state = {
    jokes: []
  };
  componentDidMount() {
    let APICalls = [];
    for (let i = 0; i < 20; i++) {
      APICalls.push(
        axios({
          method: 'get',
          url: 'http://icanhazdadjoke.com',
          headers: {
            Accept: 'application/json'
          }
        })
      );
    }
    Promise.all(APICalls)
      .then(res => {
        console.log(res);
        this.setState({
          jokes: res.map(j => j.data.joke)
        });
      })
      .catch(e => console.log(e));
    // console.log(joke.data.joke);
  }
  render() {
    return (
      <div className="App">
        <JokeList jokes={this.state.jokes} />
      </div>
    );
  }
}

export default App;
