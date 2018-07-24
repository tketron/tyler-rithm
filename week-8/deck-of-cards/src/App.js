import React, { Component } from 'react';
import './App.css';
import axios from 'axios';

class App extends Component {
  state = {
    allCards: [],
    displayedCards: []
  };

  async componentDidMount() {
    try {
      const response = await axios.get(
        'https://deckofcardsapi.com/api/deck/new/draw/?count=52'
      );
      console.log(response);
      this.setState({
        allCards: response.data.cards
      });
    } catch (e) {
      console.log(e);
    }
  }

  drawCard = () => {
    //remove a card from allCards
    this.setState(prevState => {
      return {
        allCards: prevState.allCards.slice(1),
        displayedCards: [
          ...prevState.displayedCards,
          prevState.allCards.shift()
        ]
      };
    });
  };

  render() {
    return (
      <div className="App">
        <button onClick={this.drawCard}>Get a card</button>
        {this.state.displayedCards.map((c, idx) => (
          <img key={idx} src={c.image} />
        ))}
      </div>
    );
  }
}

export default App;
