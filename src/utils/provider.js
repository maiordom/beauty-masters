import RNFetchBlob from 'react-native-fetch-blob';
import { stringify } from 'qs';

import config from '../config';

const getBody = (params) =>
  decodeURIComponent(stringify(params)).split('&').map(param => {
    const [name, data] = param.split('=');

    return {
      name,
      data,
    };
  });

export const post = (method, params, headers = {}) => {
  const body = getBody(params);
  const bodyCopy = body.slice().map(param => Object.assign({}, param));

  return RNFetchBlob.fetch('POST', config.host + method.path, {
    'Content-Type': 'multipart/form-data',
    ...headers,
  }, body)
  .then(res => {
    if (!res.data) {
      return {};
    }

    return res.json();
  })
  .then(res => {
    if (__DEV__) {
      console.log(`${method.path}::${method.method}::params`);
      console.log(bodyCopy);
      console.log(`${method.path}::${method.method}::response`);
      console.log(res);
    }

    if (res.errors) {
      const { code, title, detail } = res.errors[0];

      return {
        error: {
          code,
          detail,
          title,
        },
      };
    }

    return res;
  });
};

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

    return res;
  })
);

export const geo = (method, params) => {
  const decodedParams = stringify(params);
  const url = `${config.googlePlacesHost}${method}?${decodedParams}`;

  return RNFetchBlob.fetch('GET', url, {
    'Content-Type': 'application/json',
  })
  .then((res) => res.json())
  .then(res => {
    if (__DEV__) {
      console.log('googlePlaces::params');
      console.log(params);
      console.log('googlePlaces::response');
      console.log(res);
    }

    if (res.status !== 'OK') {
      return {
        error: {},
      };
    }

    return res;
  });
};
