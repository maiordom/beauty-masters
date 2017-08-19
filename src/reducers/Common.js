import { makeReducer, deepUpdate } from '../utils';

import actions from '../constants/common';

export default makeReducer((state, action) => ({
  [actions.DICTIONARIES_SET]: () => {
    const { services = [] } = action;
    const serviceById = {};
    const serviceByKey = {};

    services.forEach(service => {
      serviceById[service.id] = service;
      serviceByKey[service.key] = service;
    });

    state.dictionaries = {
      serviceById,
      serviceByKey,
    };

    return state;
  },

  [actions.ACTIVITY_INDICATOR_ANIMATING]: () =>
    deepUpdate(state, 'activityIndicator', {
      animating: actions.animating
    })
}));
