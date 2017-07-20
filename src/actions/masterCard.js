// @flow

import actions from '../constants/masterCard';
import * as MasterCardService from '../services/masterCard';

export const getMasterById = (id: number) => (dispatch: Function) => {
  MasterCardService.getMasterById(id)
    .then(masterData => {
      dispatch({
        type: actions.MASTER_CARD_SET_DATA,
        masterData,
      });
    });
};