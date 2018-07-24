import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import JokeList from './JokeList';
// import Joke from './Joke';
import axios from 'axios';
import uuid from 'uuid';

class App extends Component {
  state = {
    //array of objects with joke message and votecount
    jokes: [],
    next_page: 1
  };

  async componentDidMount() {
    await this.getNewJokes();
  }

  handleJokeRefresh = async () => {
    this.setState({
      jokes: []
    });
    await this.getNewJokes();
  };

  async getNewJokes() {
    const response = await axios({
      method: 'get',
      url: `http://icanhazdadjoke.com/search?page=${this.state.next_page}`,
      params: {
        page: this.state.next_page
      },
      headers: {
        Accept: 'application/json'
      }
    });
    this.setState({
      jokes: response.data.results.map(j => {
        return {
          text: j.joke,
          count: 0,
          id: uuid()
        };
      }),
      next_page: response.data.next_page
    });
  }

  handleUpvote = id => {
    this.setState({
      jokes: this.state.jokes.map(j => {
        if (j.id === id) {
          j.count++;
        }
        return j;
      })
    });
  };

  handlDownvote = id => {
    this.setState({
      jokes: this.state.jokes.map(j => {
        if (j.id === id) {
          j.count--;
        }
        return j;
      })
    });
  };

  render() {
    return (
      <div className="App">
        <JokeList
          jokes={this.state.jokes}
          refreshJokes={this.handleJokeRefresh}
          onUpvote={this.handleUpvote}
          onDownvote={this.handlDownvote}
        />
      </div>
    );
  }
}

export default App;
