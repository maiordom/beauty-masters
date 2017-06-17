import * as DictionariesService from '../services/dictionaries';
import actions from '../constants/common';

export const getDictionaries = () =>
  dispatch => DictionariesService.getDictionaries()
    .then(response => {
      dispatch({
        type: actions.DICTIONARIES_SET,
        services: response.services,
      });
    });
