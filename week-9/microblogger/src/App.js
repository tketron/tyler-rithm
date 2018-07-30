import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import NewPostForm from './NewPostForm';
import PostList from './PostList';
import uuid from 'uuid/v4';
import TitleList from './TitleList';

class App extends Component {
  render() {
    return (
      <div className="App">
        <TitleList className="App-TitleList" />
        <div className="App-posts">
          <NewPostForm className="App-NewPostForm" />
          <PostList className="App-PostList" />
        </div>
      </div>
    );
  }
}

export default App;
