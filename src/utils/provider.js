import RNFetchBlob from 'react-native-fetch-blob';

import config from '../config';

export const post = (method) => (
  RNFetchBlob.fetch(method.method, config.host + method.path, {
    'Content-Type': 'application/json',
  })
  .then(res => res.json())
);

export const get = (method) => (
  RNFetchBlob.fetch(method.method, config.host + method.path, {
      'Content-Type': 'application/json',
  })
  .then(res => res.json())
);
