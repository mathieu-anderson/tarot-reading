import React, { Component } from 'react';
import { knuthShuffle as shuffle } from 'knuth-shuffle';

import { cards } from './cards';

import assets from './assets';
import './Table.css';

const getRange = (low, hi) => {
  function rangeRec (low, hi, vals) {
    if (low > hi) return vals;
    vals.push(low);
    return rangeRec(low + 1, hi, vals);
  }
  return rangeRec(low, hi, []);
};

const getShuffledDeck = (deck) => shuffle(deck.slice(0));
const removeFromDeck = (deck, toRemove) => deck.filter(card => card.id !== toRemove.id);
const getRandomNumber = (max) => shuffle(getRange(0, max).slice(0))[0];
const getRandomCard = (deck) => getShuffledDeck(deck)[getRandomNumber(deck.length - 1)];

const Card = ({ card, image }) => {
  return <React.Fragment>
    {image}
    <div>{card.name} {card.number}</div>
  </React.Fragment>;
};

export class Table extends Component {
  constructor (props) {
    super(props);
    this.state = {
      deck: cards,
      cards: []
    };
    this.handleDraw = this.handleDraw.bind(this);
    this.handleShuffle = this.handleShuffle.bind(this);
  }

  handleDraw () {
    if (this.state.deck.length <= 0) {
      return window.alert('The deck is empty, please shuffle.');
    }

    const card = getRandomCard(this.state.deck);
    const nextDeck = removeFromDeck(this.state.deck, card);

    this.setState({
      deck: nextDeck,
      cards: [...this.state.cards, card]
    });
  }

  handleShuffle () {
    this.setState({
      deck: getShuffledDeck(cards),
      cards: []
    });
  }

  render () {
    return (
      <React.Fragment>
        <div className='Table-container'>
          <div className='Table-buttons'>
            <div className='Table-reset' onClick={this.handleShuffle}>
              Shuffle deck
            </div>
            <div className='Table-draw' onClick={this.handleDraw}>
              Draw a card
            </div>
          </div>
        </div>
        <div className='Table-cards'>
          {
            this.state.cards.map((card, index) => {
              return <div key={card.id + index}>
                <Card card={card} image={assets[card.id]} />
              </div>;
            })
          }
        </div>
      </React.Fragment>
    );
  }
}

export default Table;
