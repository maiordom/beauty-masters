import RNFetchBlob from 'react-native-fetch-blob';

import routes from '../routes';

export function uploadFile({ uri, type }) {
  return RNFetchBlob.fetch('POST', routes.upload, {
    'Content-Type': 'multipart/form-data',
  }, [
    {
      data: RNFetchBlob.wrap(uri),
      filename: 'filename',
      name: 'file',
      type,
    },
  ]);
}
