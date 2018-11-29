import React, { useState } from 'react';

import { getShuffledDeck, getRandomCard, removeFromDeck } from './utils';
import Card from './Card';

import { cardsData } from './cardsData';
import './App.scss';

const cardPlaceholder = <div className='card-placeholder' />;

const App = () => {
  const [deck, setDeck] = useState(cardsData);
  const [drawnCards, setDrawnCards] = useState([]);

  const handleShuffle = () => {
    setDeck(getShuffledDeck(cardsData));
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
    <div className='App'>
      <section className='buttons'>
        <div className='button-reset' onClick={handleShuffle}>
            Shuffle deck
        </div>
        {
          drawnCards.length < 4
            ? <div className='button-draw' onClick={handleDraw}>
                Draw a card
            </div>
            : <div className='button-draw inactive'>
                Draw a card
            </div>
        }

      </section>

      <section className='cards'>
        { drawnCards[0] ? <Card card={drawnCards[0]} /> : cardPlaceholder }
        { drawnCards[1] ? <Card card={drawnCards[1]} /> : cardPlaceholder }
        { drawnCards[2] ? <Card card={drawnCards[2]} /> : cardPlaceholder }
        { drawnCards[3] ? <Card card={drawnCards[3]} /> : cardPlaceholder }
      </section>

    </div>
  );
};

export default App;
