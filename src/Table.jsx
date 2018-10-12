import React, { Component, PureComponent } from 'react';
import { knuthShuffle as shuffle } from 'knuth-shuffle';

import { cards } from './cards';

import assets from './assets';
import './Table.scss';

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
const getRandomOrientation = () => shuffle(['upright', 'reversed'])[0];

class Card extends PureComponent {
  render () {
    const { card, title } = this.props;
    const orientation = getRandomOrientation();

    if (!card) {
      return <div className='Table-card'>
        <h3>
          {title}
        </h3>
      </div>;
    }
    return <div className='Table-card'>
      <h3>
        {title}
      </h3>
      {
        orientation === 'upright'
          ? assets[card.id]
          : <div className='Table-card-reversed'>{assets[card.id]}</div>
      }
      <h3>
        {card.number} - {card.id}
      </h3>
      <h4 />
      <div className='Table-card-description'>
        <div>
          <b>Element</b>: {card.element}
        </div>
        <div>
          <b>Astrology</b>: {card.astro}
        </div>
        {
          orientation === 'upright'
            ? <div>
              <b>{orientation}</b>: {card.upright[getRandomNumber(card.upright.length - 1)]}
            </div>
            : <div>
              <b>{orientation}</b>: {card.reversed[getRandomNumber(card.reversed.length - 1)]}
            </div>
        }
      </div>
    </div>;
  }
}

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
    const drawnCards = this.state.cards;

    return (
      <React.Fragment>
        <div className='Table-container'>
          <div className='Table-buttons'>
            <div className='Table-reset' onClick={this.handleShuffle}>
              Shuffle deck
            </div>
            {
              drawnCards.length < 4
                ? <div className='Table-draw' onClick={this.handleDraw}>
                  Draw a card
                </div>
                : <div className='Table-draw inactive'>
                  Draw a card
                </div>
            }

          </div>
        </div>
        <div className='Table-cards'>
          <Card card={drawnCards[0]} title='Inside' />
          <Card card={drawnCards[1]} title='Outside' />
          <Card card={drawnCards[2]} title='Communication' />
          <Card card={drawnCards[3]} title='Outcome' />
        </div>
      </React.Fragment>
    );
  }
}

export default Table;
