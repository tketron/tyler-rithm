import React, { Component } from 'react';
import Dice from './Dice';
import Scoring from './Scoring';
import './Game.css';

const NUM_DICE = 5;
const NUM_ROLLS = 3;

class Game extends Component {
  state = {
    dice: Array.from({ length: NUM_DICE }),
    locked: Array(NUM_DICE).fill(false),
    rollsLeft: NUM_ROLLS,
    scores: {
      ones: undefined,
      twos: undefined,
      threes: undefined,
      fours: undefined,
      fives: undefined,
      sixes: undefined,
      threeOfKind: undefined,
      fourOfKind: undefined,
      fullHouse: undefined,
      smallStraight: undefined,
      largeStraight: undefined,
      yahtzee: undefined,
      chance: undefined
    },
    totalScore: 0,
    rounds: 12
  };

  componentDidMount() {
    this.roll();
  }

  roll = evt => {
    // roll dice whose indexes are in reroll
    this.setState(st => ({
      dice: st.dice.map(
        (d, i) => (st.locked[i] ? d : Math.ceil(Math.random() * 6))
      ),
      locked: st.rollsLeft > 1 ? st.locked : Array(NUM_DICE).fill(true),
      rollsLeft: st.rollsLeft - 1
    }));
  };

  toggleLocked = idx => {
    // toggle whether idx is in locked or not
    this.setState(st => ({
      locked: [
        ...st.locked.slice(0, idx),
        !st.locked[idx],
        ...st.locked.slice(idx + 1)
      ]
    }));
  };

  doScore = (rulename, ruleFn) => {
    // evaluate this ruleFn with the dice and score this rulename
    this.setState(st => {
      const newScore = st.scores[rulename] || ruleFn(this.state.dice);

      return {
        scores: {
          ...st.scores,
          [rulename]: newScore
        },
        // reset number of rolls and dice field
        rollsLeft: NUM_ROLLS,
        locked: Array(NUM_DICE).fill(false),
        totalScore: st.totalScore + newScore,
        rounds: st.rounds + 1
      };
    });
    this.roll();
  };

  resetGameState = () => {
    this.setState({
      dice: Array.from({ length: NUM_DICE }),
      locked: Array(NUM_DICE).fill(false),
      rollsLeft: NUM_ROLLS,
      scores: {
        ones: undefined,
        twos: undefined,
        threes: undefined,
        fours: undefined,
        fives: undefined,
        sixes: undefined,
        threeOfKind: undefined,
        fourOfKind: undefined,
        fullHouse: undefined,
        smallStraight: undefined,
        largeStraight: undefined,
        yahtzee: undefined,
        chance: undefined
      },
      totalScore: 0,
      rounds: 12
    });
    this.roll();
  }

  render() {
    return (
      <div>
        <section>
          <Dice
            dice={this.state.dice}
            locked={this.state.locked}
            handleClick={this.toggleLocked}
          />
          <button
            className="Game-reroll"
            disabled={this.state.locked.every(x => x)}
            onClick={this.roll}
          >
            {this.state.rollsLeft} Rerolls Left
          </button>
          <h3>Total Score: {this.state.totalScore}</h3>
          <Scoring doScore={this.doScore} scores={this.state.scores} />
          {this.state.rounds <= 13 ? (
            ''
          ) : (
            <div className="Game-finished-background">
              <div className="Game-finished-modal">
                <h1>GAME OVER</h1>
                <p>Your final score was {this.state.totalScore}</p>
                <button className="Game-finished-button" onClick={this.resetGameState}>Play again?</button>
              </div>
            </div>
          )}
        </section>
      </div>
    );
  }
}

export default Game;
