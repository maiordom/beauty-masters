import RNFetchBlob from 'react-native-fetch-blob';
import { stringify } from 'qs';
import { Crashlytics } from 'react-native-fabric';
import axios from 'axios';

import config from '../config';
import { log } from './Log';

const { host, googlePlacesHost } = config;
const getBody = (params: Object) => decodeURIComponent(stringify(params));

const handleResolveResponse = (
  res: Object = { data: {} },
  path: string,
  method: string,
) => {
  if (res.data === '') {
    res.data = {};
  }

  if (__DEV__) {
    log(`${path}::${method}::response`);

    if (method !== 'GET') {
      log(res.data);
    }
  }

  return {
    ...res.data,
    status: 'success',
  };
};

const handleRejectResponse = (res: Object = { data: {} }, path: string, method: string) => {
  if (__DEV__) {
    log(`${path}::${method}::exx`, res.data);
  }

  if (res.data.errors) {
    const { code, title, detail } = res.data.errors[0];

    try {
      Crashlytics.logException(JSON.stringify(res.data.errors));
    } catch (exx) {
      log(`Crashlytics::exx::${exx}`);
    }

    return Promise.resolve({
      status: 'error',
      error: {
        code,
        detail,
        title,
      },
    });
  }

  return Promise.resolve({
    status: 'error',
    error: {},
  });
}

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

  return axios({
    url,
    timeout: 10000,
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      ...headers,
    },
    responseType: 'text',
    method: fetchMethod,
    data: body,
  })
    .then((res: Object) => handleResolveResponse(res, path, method.method))
    .catch((exx: Object) => handleRejectResponse(exx.response, path, method.method));
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

  return axios.get(url, {
    timeout: 10000,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
    responseType: 'text',
  })
    .then((res: Object) => handleResolveResponse(res, path, method.method))
    .catch((exx: Object) => handleRejectResponse(exx.response, path, method.method));
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
