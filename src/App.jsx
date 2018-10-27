import React, { useState } from 'react';

import { getShuffledDeck, getRandomCard, removeFromDeck } from './utils';
import Card from './Card';

import { cardsData } from './cardsData';
import './App.scss';

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
      <section className='Table-buttons'>
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

      </section>

      <section className='Table-cards'>
        <Card card={drawnCards[0]} title='Inside' />
        <Card card={drawnCards[1]} title='Outside' />
        <Card card={drawnCards[2]} title='Communication' />
        <Card card={drawnCards[3]} title='Outcome' />
      </section>

    </div>
  );
};

export default App;
