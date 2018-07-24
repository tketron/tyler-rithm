import React, { Component } from 'react';
import NewMemeForm from '../NewMemeForm';
import Meme from '../Meme';
import './style.css';

class App extends Component {
  state = {
    memes: []
  };

  addMeme = newMeme => {
    this.setState({
      memes: this.state.memes.concat(newMeme)
    });
  };

  deleteMeme = id => {
    this.setState(prevState => {
      return {
        memes: prevState.memes.filter(meme => meme.id !== id)
      };
    });
  };

  render() {
    return (
      <div className="App">
        <NewMemeForm addMeme={this.addMeme} />
        <hr />
        {this.state.memes.map(m => (
          <Meme key={m.id} {...m} deleteMeme={this.deleteMeme} />
        ))}
      </div>
    );
  }
}

export default App;
