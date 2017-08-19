import * as DictionariesService from '../services/dictionaries';
import actions from '../constants/common';

export const getServices = () =>
  dispatch => DictionariesService.getServices()
    .then(response => {
      dispatch({
        type: actions.DICTIONARIES_SET,
        services: response.services,
      });
    });
