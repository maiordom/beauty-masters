import RNFetchBlob from 'react-native-fetch-blob';
import { stringify } from 'qs';

import config from '../config';

const getBody = (params) => stringify({
  data: {
    attributes: {
      ...params
    },
  },
}, { encode: false }).split('&').map(param => {
  const [ name, data ] = param.split('=');

  return {
    name,
    data,
  };
});

export const post = (method, params, headers = {}) => {
  return RNFetchBlob.fetch('POST', config.host + method.path, {
    'Content-Type': 'multipart/form-data',
    ...headers
  }, getBody(params))
  .then(res => res.json())
  .then(res => {
    if (__DEV__) {
      console.log(`${method.path}::${method.method}::response`, res);
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
  })
};

export const get = (method, params, headers = {}) => (
  RNFetchBlob.fetch('GET', config.host + method.path, {
      'Content-Type': 'application/json',
      ...headers
  })
  .then(res => res.json())
);
