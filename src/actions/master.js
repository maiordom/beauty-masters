import { uploadFile } from '../services/upload';

import actions from '../constants/master';
import { drawerClose } from './drawer';

export const uploadMasterPersonalPhoto = fileData => dispatch => {
  return uploadFile(fileData)
    .then(response => response.json())
    .then(({result, file_name, sizes, media_url}) => {
      if (result) {
        dispatch({
          type: actions.MASTER_SET_PERSONAL_PHOTO,
          fileName: file_name,
          sizes,
          mediaUrl: media_url
        });
        drawerClose();
      }
    });
};
