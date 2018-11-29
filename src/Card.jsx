import React, { memo, useState } from 'react';

import { getRandomOrientation } from './utils';

import CardDescription from './CardDescription';

import assets from './assets';
import './Card.scss';

const getAsset = (flipped, id) => flipped ? assets['back'] : assets[id];

const Card = memo(props => {
  const { card, title } = props;
  const orientation = getRandomOrientation();

  const [flipped, setFlipped] = useState(true);
  const handleFlip = flipped => flipped ? setFlipped(false) : null;

  if (!card) {
    return <div className='card'>
      <h3>
        {title}
      </h3>
    </div>;
  }

  // return <div className={flipped ? 'card-flipped' : 'card'}>
  //   {
  //     orientation === 'upright'
  //       ? <div onClick={() => handleFlip(flipped)}>{getAsset(flipped, card.id)}</div>
  //       : <div onClick={() => handleFlip(flipped)} className='card-reversed'>{getAsset(flipped, card.id)}</div>
  //   }
  // </div>;

  return (
    <div className='card'>
      <div className={flipped ? 'card-flipped' : null}>
        {
          orientation === 'upright'
            ? <div onClick={() => handleFlip(flipped)}>{getAsset(flipped, card.id)}</div>
            : <div onClick={() => handleFlip(flipped)} className='card-reversed'>{getAsset(flipped, card.id)}</div>
        }
      </div>
      {
        flipped
          ? null
          : <CardDescription card={card} orientation={orientation} />
      }
    </div>
  );
});

export default Card;
