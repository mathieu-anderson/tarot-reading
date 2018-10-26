import React, { memo, useState } from 'react';
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

const Card = memo(props => {
  const { card, title } = props;
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
      {card.number} - {card.name}
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
            <b>Key</b>: {card.upright[getRandomNumber(card.upright.length - 1)]}
          </div>
          : <div>
            <b>Key</b>: {card.reversed[getRandomNumber(card.reversed.length - 1)]}
          </div>
      }
    </div>
  </div>;
});

const Table = () => {
  const [deck, setDeck] = useState(cards);
  const [drawnCards, setDrawnCards] = useState([]);

  const handleShuffle = () => {
    setDeck(getShuffledDeck(cards));
    setDrawnCards([]);
  };

  const handleDraw = () => {
    if (deck.length <= 0) {
      return;
    }

    const drawnCard = getRandomCard(deck);
    const nextDeck = removeFromDeck(deck, drawnCard);

    setDeck(nextDeck);
    setDrawnCards([...drawnCards, drawnCard]);
  };

  return (
    <React.Fragment>
      <div className='Table-container'>
        <div className='Table-buttons'>
          <div className='Table-reset' onClick={handleShuffle}>
          Shuffle deck
          </div>
          {
            drawnCards.length < 4
              ? <div className='Table-draw' onClick={handleDraw}>
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
};

export default Table;
