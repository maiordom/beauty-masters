import actions from '../constants/MasterEdit';
import * as MasterCardService from '../services/MasterCard';

export const setGeneralInfo = (masterCard) => ({
  type: actions.MASTER_EDIT_GENERAL_INFO_SET,
  payload: { masterCard },
});

export const setManicureServices = (masterCard) => ({
  type: actions.MASTER_EDIT_MANICURE_SERVICES_SET,
  payload: { masterCard },
});

export const setPedicureServices = (masterCard) => ({
  type: actions.MASTER_EDIT_PEDICURE_SERVICES_SET,
  payload: { masterCard },
});

export const setHandlingTools = (masterCard) => ({
  type: actions.MASTER_EDIT_HANDLING_TOOLS_SET,
  payload: { masterCard },
});

export const setCalendars = (masterCard) => ({
  type: actions.MASTER_EDIT_CALENDARS_SET,
  payload: { masterCard },
});

export const setStatus = (masterCardId) => ({
  type: actions.MASTER_EDIT_STATUS_SET,
  payload: { masterCardId },
});

export const setPhotos = (id: number) => (dispatch: Function) =>
  MasterCardService.getMasterById(id)
    .then((res: Object) => {
      if (!res.error) {
        dispatch({
          type: actions.MASTER_EDIT_PHOTOS_SET,
          payload: { masterCard: res },
        });
      }
    });
