import React, { memo } from 'react';

import { getRandomOrientation } from './utils';

import CardDescription from './CardDescription';

import assets from './assets';
import './Card.scss';

const Card = memo(props => {
  const { card, title } = props;
  const orientation = getRandomOrientation();

  if (!card) {
    return <div className='Table-card'>
      <h3>
        {title}
      </h3>
      {
        assets['back']
      }
    </div>;
  }

  return (
    <div className='Table-card'>
      <h3>
        {title}
      </h3>
      {
        orientation === 'upright'
          ? assets[card.id]
          : <div className='Table-card-reversed'>{assets[card.id]}</div>
      }
      <CardDescription card={card} orientation={orientation} />
    </div>
  );
});

export default Card;
