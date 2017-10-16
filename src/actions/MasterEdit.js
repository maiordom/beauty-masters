import actions from '../constants/MasterEdit';

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
