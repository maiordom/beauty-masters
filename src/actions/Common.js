// @flow

import actions from '../constants/Common';

export const setActivityIndicator = (animating: boolean) => ({
  type: actions.ACTIVITY_INDICATOR_ANIMATING,
  animating,
});

export default null;
