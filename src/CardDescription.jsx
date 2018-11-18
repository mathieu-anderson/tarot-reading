import React from 'react';

import { getRandomNumber } from './utils';

const CardDescription = ({card, orientation}) => {
  const { number, name, element, astro, upright, reversed } = card;

  return (
    <React.Fragment>
      <h3>
        {number} - {name}
      </h3>
      <div className='Table-card-description'>
        <div>
          <b>Element</b>: {element}
        </div>
        <div>
          <b>Astrology</b>: {astro}
        </div>
        {
          orientation === 'upright'
            ? <div>
              <b>Key</b>: {upright[getRandomNumber(upright.length - 1)]}
            </div>
            : <div>
              <b>Key</b>: {reversed[getRandomNumber(reversed.length - 1)]}
            </div>
        }
      </div>

    </React.Fragment>
  );
};

export default CardDescription;
