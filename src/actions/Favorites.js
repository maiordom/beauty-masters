// @flow

import actions from '../constants/Favorites';

import type { TMapCardType } from '../types/MasterTypes';

import { setActivityIndicator } from './Common';

export const getFavorites = () => (dispatch: Function) => {
  dispatch(setActivityIndicator(true));

  return new Promise((resolve) => {
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

export const addToFavorites = (card: TMapCardType) => (dispatch: Function) => {
  dispatch({
    type: actions.FAVORITES_ADD_DATA,
    card,
  });
};

export const removeFromFavorites = (id: number) => ({
  type: actions.FAVORITES_REMOVE_DATA,
  id,
});
