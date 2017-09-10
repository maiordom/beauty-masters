import RNFetchBlob from 'react-native-fetch-blob';

import config from '../config';
import routes from '../routes';

import { post } from '../utils/Provider';

export const uploadFile = ({ uri, type }, headers, mediaType) => {
  const path = config.host + routes.upload.path(mediaType);
  const fileType = type.split('/')[1];

  console.log(`[UploadFile]::path::${path}`);
  console.log(`[UploadFile]::params::${uri}`);
  console.log(`[UploadFile]::type::${fileType}`);

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
  .then((res) => {
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

export const createPhoto = ({ mediaFileId, masterCardId }, headers, mediaType) => {
  let route;

  switch (mediaType) {
    case 'portfolio': { route = routes.createPortfolioPhoto; break; }
    case 'master': { route = routes.createMasterPhoto; break; }
    case 'certificate': { route = routes.createCertificatePhoto; break; }
    default: { break; }
  }

  const params = {
    data: {
      attributes: {
        master_card_id: masterCardId,
        media_file_id: mediaFileId,
      },
    },
  };

  return post(route, params, headers);
};

export default null;
