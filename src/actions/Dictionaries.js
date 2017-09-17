import * as DictionariesService from '../services/Dictionaries';
import actions from '../constants/Common';

export const getServices = () =>
  dispatch => DictionariesService.getServices()
    .then(res => {
      dispatch({
        type: actions.DICTIONARIES_SERVICES_SET,
        payload: { services: res.services },
      });
    });

export const getCategoryServices = () =>
  dispatch => DictionariesService.getCategoryServices()
    .then(res => {
      dispatch({
        type: actions.DICTIONARIES_CATEGORY_SERVICES_SET,
        payload: { categoryServices: res.categoryServices },
      });
    });

export default null;
