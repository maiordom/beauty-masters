import * as ProfileService from '../services/profile';

import constants from '../constants/profile';

export const getUserProfile = () => dispatch => {
  ProfileService.getUserProfile()
    .then(response => dispatch({
      type: constants.PROFILE_SET_DATA,
      data: response,
    }));
};

export const selectMainMaster = (index) => dispatch => {
  dispatch({type: constants.PROFILE_SET_MAIN, index});
}
