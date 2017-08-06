// @flow

import actions from '../constants/favorites';

import type { MapCardType } from '../types/MasterTypes';

import { setActivityIndicator } from './common';

export const getFavorites = () => (dispatch: Function) => {
  dispatch(setActivityIndicator(true));

  return new Promise(resolve => {
    setTimeout(resolve, 1500);
  })
    .then(() => {
      dispatch(setActivityIndicator(false));

      dispatch({
        type: actions.FAVORITES_SET_DATA,
        cards: [],
      });
    })
    .catch(() => {
      dispatch(setActivityIndicator(false));
    });
};

export const addToFavorites = (card: MapCardType) => (dispatch: Function) => {
  dispatch({
    type: actions.FAVORITES_ADD_DATA,
    card,
  });
};

export const removeFromFavorites = (id: number) => ({
  type: actions.FAVORITES_REMOVE_DATA,
  id,
});