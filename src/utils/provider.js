import RNFetchBlob from 'react-native-fetch-blob';
import { stringify } from 'qs';

import config from '../config';

const getBody = (params) => decodeURIComponent(stringify(params));

const baseFetch = (fetchMethod) => (method, params, headers = {}, pathParams) => {
  const body = getBody(params);
  const path = typeof method.path === 'string'
    ? method.path
    : method.path.apply(null, [pathParams]);

  console.log(`${path}::${method.method}::params`);
  console.log(params);

  return fetch(config.host + path, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      ...headers,
    },
    method: fetchMethod,
    body,
  })
  .then(res => {
    /* eslint-disable no-underscore-dangle */
    if (!res._bodyText) {
      return {};
    }

    return res.json();
  })
  .then(res => {
    if (__DEV__) {
      console.log(`${path}::${method.method}::response`);
      console.log(res);
    }

    if (res.errors) {
      const { code, title, detail } = res.errors[0];

      return {
        status: 'error',
        error: {
          code,
          detail,
          title,
        },
      };
    }

    return {
      ...res,
      status: 'success',
    };
  }).catch((res) => {
    console.log(res);
  });
};

export const post = baseFetch('POST');
export const patch = baseFetch('PATCH');

export const get = (method, params = {}, headers = {}) => (
  RNFetchBlob.fetch('GET', config.host + method.path, {
    'Content-Type': 'application/json',
    ...headers,
  })
  .then(res => res.json())
  .then(res => {
    if (__DEV__) {
      console.log(`${method.path}::${method.method}::response`);
    }

    return {
      ...res,
      status: 'ok',
    };
  })
);

export const geo = (method, params) => {
  const decodedParams = stringify(params);
  const url = `${config.googlePlacesHost}${method}?${decodedParams}`;

  console.log('googlePlaces::params');
  console.log(params);

  return RNFetchBlob.fetch('GET', url, {
    'Content-Type': 'application/json',
  })
  .then((res) => res.json())
  .then(res => {
    if (__DEV__) {
      console.log('googlePlaces::response');
      console.log(res);
    }

    if (res.status !== 'OK') {
      return {
        error: {},
        status: 'error',
      };
    }

    return {
      ...res,
      status: 'ok',
    };
  });
};
