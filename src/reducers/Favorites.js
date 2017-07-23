import uniqBy from 'lodash/uniqBy';
import { makeReducer } from '../utils';

import constants from '../constants/favorites';

export default makeReducer((state, action) => ({
  [constants.FAVORITES_SET_DATA]: () => {
    const { cards } = action;

    state.favorites = {
      ...state.favorites,
      cards: uniqBy([...cards, ...state.favorites.cards], 'id'),
      isLoaded: true,
    };

    return state;
  },

  [constants.FAVORITES_ADD_DATA]: () => {
    state.favorites.cards = [...state.favorites.cards, action.card];

    return state;
  },

  [constants.FAVORITES_REMOVE_DATA]: () => {
    state.favorites.cards = state.favorites.cards.filter(card => card.id !== action.id);

    return state;
  },
}));
