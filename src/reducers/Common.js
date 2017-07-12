import { makeReducer } from '../utils';

import actions from '../constants/common';

export default makeReducer((state, action) => ({
  [actions.DICTIONARIES_SET]: () => {
    const { services } = action;
    const serviceMapping = {};

    services.forEach(service => {
      serviceMapping[service.id] = service;
    });

    state.dictionaries = {
      services: serviceMapping,
    };

    return state;
  },

  [actions.ACTIVITY_INDICATOR_ANIMATING]: () => {
    state.activityIndicator.animating = action.animating;

    return state;
  }
}));
