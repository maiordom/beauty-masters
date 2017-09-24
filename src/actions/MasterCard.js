// @flow

import actions from '../constants/MasterCard';
import * as MasterCardService from '../services/MasterCard';

export const getMasterById = (id: number) => (dispatch: Function) =>
  MasterCardService.getMasterById(id)
    .then((res: Object) => {
      if (!res.error) {
        dispatch({
          type: actions.MASTER_CARD_SET,
          payload: res,
        });
      }
    });
