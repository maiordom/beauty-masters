// @flow
import actions from '../constants/masterCard';
import * as MasterCardService from '../services/masterCard';


export const getMasterById = (id: number) => (dispatch: () => null) => {
  MasterCardService.getMasterById(id)
    .then(masterData => {
      dispatch({
        type: actions.MASTER_CALENDAR_SET_INTERVAL,
        masterData,
      });
    });
};
