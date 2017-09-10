import * as DictionariesService from '../services/Dictionaries';
import actions from '../constants/Common';

export const getServices = () =>
  dispatch => DictionariesService.getServices()
    .then(response => {
      dispatch({
        type: actions.DICTIONARIES_SERVICES_SET,
        services: response.services,
      });
    });

export const getCategoryServices = () =>
  dispatch => DictionariesService.getCategoryServices()
    .then(response => {
      dispatch({
        type: actions.DICTIONARIES_CATEGORY_SERVICES_SET,
        categoryServices: response.categoryServices,
      });
    });

export default null;
