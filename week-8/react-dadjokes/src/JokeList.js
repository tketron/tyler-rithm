import React, { Component } from 'react';
import axios from 'axios';
import Joke from './Joke';

export default class JokeList extends Component {
  render() {
    return (
      <div className="JokeList">
        <button onClick={this.props.refreshJokes}>NEW JOKES!</button>
        {this.props.jokes.length === 0 ? (
          <p>Loading...</p>
        ) : (
          <ul>{this.props.jokes.map(j => <Joke joke={j} />)}</ul>
        )}
      </div>
    );
  }
}
