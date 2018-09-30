import React, { Component } from 'react';
import { knuthShuffle as shuffle } from 'knuth-shuffle';

import { cards, numbers } from './cards';

import './Table.css';

const getShuffledDeck = () => shuffle(cards.slice(0));
const getRandomNumber = () => shuffle(numbers.slice(0))[0];
const getRandomCard = () => {
  console.log('deck', getShuffledDeck());
  console.log('number', getRandomNumber());
  console.log('card', getShuffledDeck()[getRandomNumber()]);
  // getShuffledDeck()[getRandomNumber()]
};

export class Table extends Component {
  constructor (props) {
    super(props);
    this.state = { cards: [] };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick () {
    this.setState({
      cards: [...this.state.cards, getRandomCard()]
    });
  }

  render () {
    return (
      <React.Fragment>
        <div className='Table-container'>
          <div className='Table-draw' onClick={this.handleClick}>
          Draw a card
          </div>
        </div>
        <div className='Table-cards'>
          {
            // this.state.cards.map((card, index) => <div key={index}>{card.name} {card.number}</div>)
          }
        </div>
      </React.Fragment>
    );
  }
}

export default Table;
