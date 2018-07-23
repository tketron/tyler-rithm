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
  async componentDidMount() {
    const response = await axios({
      method: 'get',
      url: 'http://icanhazdadjoke.com/search',
      headers: {
        Accept: 'application/json'
      }
    });
    this.setState({
      jokes: response.data.results.map(j => j.joke)
    });
  }
  handleJokeRefresh = async () => {
    console.log('clicked');
    this.setState({
      jokes: []
    });
    const response = await axios({
      method: 'get',
      url: 'http://icanhazdadjoke.com/search',
      headers: {
        Accept: 'application/json'
      }
    });
    this.setState({
      jokes: response.data.results.map(j => j.joke)
    });
  };
  render() {
    return (
      <div className="App">
        <JokeList
          jokes={this.state.jokes}
          refreshJokes={this.handleJokeRefresh}
        />
      </div>
    );
  }
}

export default App;
