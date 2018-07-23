import React, { Component } from 'react';
import axios from 'axios';
import Joke from './Joke';

export default class JokeList extends Component {
  render() {
    return (
      <div>
        <ul>{this.props.jokes.map(j => <Joke joke={j} />)}</ul>
      </div>
    );
  }
}
