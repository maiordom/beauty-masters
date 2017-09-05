import * as UploadService from '../services/upload';
import actions from '../constants/master';

let photoIndex = 0;

export const uploadFileAction = (fileData, modelName, photoId, dispatch, getState) => {
  const state = getState();
  const { auth } = state;
  const { masterCardId } = state.masterEditor;
  const mediaType = state.masterEditor.info[modelName].type;
  const headers = {
    Authorization: `${auth.tokenType} ${auth.accessToken}`,
  };

  state.masterEditor.uploadPhotoStatus = actions.UPLOAD_STATUS.IN_PROCESS;

  return UploadService.uploadFile(fileData, headers, mediaType)
    .then((res) => {
      if (res.status === 'success') {
        const params = { mediaFileId: res.mediaFileId, masterCardId };
        return UploadService.createPhoto(params, headers, mediaType);
      }

      return Promise.reject();
    })
    .then((res) => {
      dispatch({
        type: actions.MASTER_PHOTO_SET,
        id: photoId,
        mediaFileId: res.data.attributes.media_file_id,
        modelName,
        sizes: res.data.attributes.image,
      });
    })
    .catch(err => {
      console.log('[UploadFile]::errorUpload', err);
      dispatch({
        type: actions.MASTER_PHOTO_REMOVE_QUEUE,
        id: photoId,
      });
    })
    .then(() => {
      const queue = getState().masterEditor.info.photosQueue.items;

      if (queue.length) {
        const { id, modelName, fileData } = queue[0];

        dispatch({
          type: actions.MASTER_PHOTO_REMOVE_QUEUE,
          id,
        });

        dispatch({
          type: actions.MASTER_PHOTO_SET_MOCK,
          id,
          modelName,
          status: actions.UPLOAD_STATUS.IN_PROCESS,
        });

        uploadFileAction(fileData, modelName, id, dispatch, getState);
      } else {
        getState().masterEditor.uploadPhotoStatus = actions.UPLOAD_STATUS.INACTIVE;
      }
    });
};

export const uploadMasterPhoto = (fileData, modelName) => (dispatch, getState) => {
  const photoId = photoIndex++;

  dispatch({
    type: actions.MASTER_PHOTO_SET_MOCK,
    id: photoId,
    modelName,
    status: getState().masterEditor.uploadPhotoStatus === actions.UPLOAD_STATUS.IN_PROCESS
      ? actions.UPLOAD_STATUS.IN_QUEUE
      : actions.UPLOAD_STATUS.IN_PROCESS,
  });

  if (getState().masterEditor.uploadPhotoStatus === actions.UPLOAD_STATUS.IN_PROCESS) {
    return dispatch({
      type: actions.MASTER_PHOTO_SET_QUEUE,
      fileData,
      id: photoId,
      modelName,
    });
  }

  uploadFileAction(fileData, modelName, photoId, dispatch, getState);
};

export default null;
