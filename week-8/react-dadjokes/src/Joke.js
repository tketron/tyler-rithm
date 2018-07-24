import React, { Component } from 'react';
import './Joke.css';

export default class Joke extends Component {
  render() {
    return (
      <div className="Joke">
        <div className="Joke-vote-container">
          <button onClick={this.props.upvote}>Upvote</button>
          <p>{this.props.joke.count}</p>
          <button onClick={this.props.downvote}>Downvote</button>
        </div>
        <p>{this.props.joke.text}</p>
      </div>
    );
  }
}
