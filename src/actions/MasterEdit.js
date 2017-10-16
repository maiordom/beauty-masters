import actions from '../constants/MasterEdit';

export const setGeneralInfo = (masterCard) => ({
  type: actions.MASTER_EDIT_GENERAL_INFO_SET,
  payload: { masterCard },
});

export const setServices = (masterCard) => ({
  type: actions.MASTER_EDIT_SERVICES_SET,
  payload: { masterCard },
});
