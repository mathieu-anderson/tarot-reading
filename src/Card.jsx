import React, { memo } from 'react';

import { getRandomOrientation, getRandomNumber } from './utils';

import assets from './assets';
import './Cards.scss';

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

export default Card;
