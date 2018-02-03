import RNFetchBlob from 'react-native-fetch-blob';
import { stringify } from 'qs';
import { Crashlytics } from 'react-native-fabric';

import config from '../config';
import { log } from './Log';

const { host, googlePlacesHost } = config;
const getBody = (params: Object) => decodeURIComponent(stringify(params));

const handleFetchResponse = (
  res: Object,
  path: string,
  method: string,
) => {
  if (__DEV__ && method !== 'GET') {
    log(`${path}::${method}::response`);
    log(res);
  }

  if (__DEV__ && method === 'GET') {
    log(`${path}::${method}::response`);

    if (res.errors) {
      log(res.errors);
    }
  }

  if (res.errors) {
    const { code, title, detail } = res.errors[0];

    try {
      Crashlytics.logException(JSON.stringify(res.errors));
    } catch (exx) {
      log(`Crashlytics::exx::${exx}`);
    }

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
};

const baseFetch = (fetchMethod: string) => (
  method: Object,
  params: Object,
  headers: Object = {},
  pathParams: Object = {},
) => {
  const body = getBody(params);
  const path = typeof method.path === 'string'
    ? method.path
    : method.path.apply(null, [pathParams]);
  const url = `${host}${path}`;

  if (__DEV__) {
    log(`${path}::${method.method}::params`);
    log(params);
  }

  return fetch(url, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      ...headers,
    },
    method: fetchMethod,
    body,
  })
    .then((res: Object) => {
    /* eslint-disable no-underscore-dangle */
      if (!res._bodyText) {
        return {};
      }

      return res.json();
    })
    .then((res: Object) => handleFetchResponse(res, path, method.method))
    .catch((res: Object) => {
      if (__DEV__) {
        log(`${path}::${method.method}::exx`, res);
      }

      return Promise.reject(res);
    });
};

export const post = baseFetch('POST');
export const patch = baseFetch('PATCH');
export const deleteMethod = baseFetch('DELETE');

export const get = (
  method: Object,
  params: Object = {},
  headers: Object = {},
  pathParams: Object = {},
) => {
  const path = typeof method.path === 'string'
    ? method.path
    : method.path.apply(null, [pathParams]);

  const serializedParams = stringify(params);
  const location = `${path}?${serializedParams}`;
  const url = `${host}${location}`;

  log(
    `${location}::GET::request`,
    'params::', params,
    'pathParams::', pathParams,
  );

  return RNFetchBlob.fetch('GET', url, {
    'Content-Type': 'application/json',
    ...headers,
  })
    .then((res: Object) => res.json())
    .then((res: Object) => handleFetchResponse(res, path, method.method))
    .catch((res: Object) => {
      log(`${location}::GET::exx`, res);
      return Promise.reject(res);
    });
};

export const geo = (method: string, params: Object) => {
  const decodedParams = stringify(params);
  const url = `${googlePlacesHost}${method}?${decodedParams}`;

  log('googlePlaces::params');
  log(params);

  return RNFetchBlob.fetch('GET', url, {
    'Content-Type': 'application/json',
  })
    .then((res: Object) => res.json())
    .then((res: Object = {}) => {
      if (__DEV__) {
        log('googlePlaces::response');
        log(res);
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
    })
    .catch((exx) => {
      log('googlePlaces::exx', exx);

      return {
        error: {},
      };
    });
};
