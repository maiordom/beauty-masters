import RNFetchBlob from 'react-native-fetch-blob';

import config from '../config';
import routes from '../routes';
import { log } from '../utils/Log';

export const uploadFile = ({ uri, type }, headers, mediaType) => {
  const path = config.host + routes.upload.path(mediaType);
  const fileType = type.split('/')[1];

  log(`[UploadFile]::path::${path}`);
  log(`[UploadFile]::params::${uri}`);
  log(`[UploadFile]::type::${fileType}`);

  return RNFetchBlob.fetch('POST', path, {
    'Content-Type': 'multipart/form-data',
    ...headers,
  }, [
    {
      data: RNFetchBlob.wrap(uri),
      filename: `filename.${fileType}`,
      name: 'image',
      type,
    },
  ])
    .then(res => res.json())
    .then((res = {}) => {
      log('[UploadFile::response]', res);

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
        status: 'success',
        mediaFileId: res.data.id,
      };
    });
};

export default null;
