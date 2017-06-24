import camelcaseKeys from 'camelcase-keys';
import capitalize from 'lodash/capitalize';
import groupBy from 'lodash/groupBy';

import { makeReducer } from '../utils';

import constants from '../constants/profile';

export default makeReducer((state, action) => ({
  [constants.PROFILE_SET_DATA]: () => {
    const { data } = action;

    state.profile = camelcaseKeys(data, { deep: true });

    const masterServices = groupBy(
      state.profile.services.map(({ serviceId, price, duration }) => {
        const { title, parentServiceId } = state.dictionaries.services[serviceId];

        return { price, duration, title, serviceId, parentServiceId };
      }),
      'parentServiceId',
    );

    state.profile.services = Object.keys(masterServices)
      .map(id => state.dictionaries.services[id])
      .map(service => ({
        title: capitalize(service.title),
        id: service.id,
        services: masterServices[service.id].map(_service => ({ ..._service, title: capitalize(_service.title) })),
      }));

    return state;
  },
}));
