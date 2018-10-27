import { knuthShuffle as shuffle } from 'knuth-shuffle';

export const getRandomOrientation = () => shuffle(['upright', 'reversed'])[0];

export const getShuffledDeck = (deck) => shuffle(deck.slice(0));

export const removeFromDeck = (deck, toRemove) => deck.filter(card => card.id !== toRemove.id);

export const getRandomNumber = (max) => shuffle(getRange(0, max).slice(0))[0];

export const getRandomCard = (deck) => getShuffledDeck(deck)[getRandomNumber(deck.length - 1)];

export const getRange = (low, hi) => {
  function rangeRec (low, hi, vals) {
    if (low > hi) return vals;
    vals.push(low);
    return rangeRec(low + 1, hi, vals);
  }
  return rangeRec(low, hi, []);
};
