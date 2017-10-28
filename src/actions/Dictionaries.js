import * as DictionariesService from '../services/Dictionaries';
import actions from '../constants/Common';

export const setServices = (dispatch, services) =>
  dispatch({
    type: actions.DICTIONARIES_SERVICES_SET,
    payload: { services },
  });

export const setCategoryServices = (dispatch, categoryServices) =>
  dispatch({
    type: actions.DICTIONARIES_CATEGORY_SERVICES_SET,
    payload: { categoryServices },
  });

export const getServices = () =>
  dispatch => DictionariesService.getServices()
    .then(res => {
      setServices(dispatch, res.services);
    });

export const getCategoryServices = () =>
  dispatch => DictionariesService.getCategoryServices()
    .then(res => {
      setCategoryServices(dispatch, res.categoryServices);
    });

export default null;