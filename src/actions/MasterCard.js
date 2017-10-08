// @flow

import actions from '../constants/MasterCard';
import * as MasterCardService from '../services/MasterCard';
import * as ProfileService from '../services/Profile';

export const getMasterById = (id: number) => (dispatch: Function) =>
  MasterCardService.getMasterById(id)
    .then((res: Object) => {
      if (!res.error) {
        dispatch({
          type: actions.MASTER_CARD_SET,
          payload: res,
        });
      }

      return res;
    });

export const getAddresses = (masterCardId: number) => (dispatch: Function) =>
  ProfileService.getAddresses({
    filters: `[{"operator":"=","attribute":"master_card_id","value":${masterCardId}}]`,
    include: 'timetables,schedules',
  }).then((res: Object) => {
    if (!res.error) {
      dispatch({
        type: actions.MASTER_CARD_ADDRESSES_SET,
        payload: { addresses: res, masterCardId },
      });
    }

    return res;
  });
