import RNFetchBlob from 'react-native-fetch-blob';

import config from '../config';

export const post = (method, params) => (
  RNFetchBlob.fetch('POST', `${config.host}/${config.rpc}`, {
    'Content-Type': 'application/json',
  }, JSON.stringify({
    ...method,
    jsonrpc: '2.0',
    params,
  }))
  .then(response => response.json())
);
