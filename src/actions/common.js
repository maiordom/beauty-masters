// @flow

import actions from '../constants/common';

export const setActivityIndicator = (animating: Boolean) => ({
  type: actions.ACTIVITY_INDICATOR_ANIMATING,
  animating,
});
