import { uploadFile } from '../services/upload';

import actions from '../constants/master';
import constants from '../constants/master';

let index = 0;

function uploadFileAction(fileData, modelName, photoId, dispatch, getState) {
  getState().masterEditor.uploadPhotoStatus = constants.UPLOAD_STATUS.IN_PROCESS;

  return uploadFile(fileData)
    .then(response => {
      try {
        return response.json();
      } catch(exx) {
        console.log(exx);
      }
    })
    .then(({result, file_name, sizes, media_url}) => {
      if (!result) {
        return;
      }

      console.log(file_name);

      dispatch({
        type: actions.MASTER_PHOTO_SET,
        fileName: file_name,
        id: photoId,
        mediaUrl: media_url,
        modelName,
        sizes,
      });
    })
    .catch(err => {
      console.log(err);
      // dispatch({
      //   type: actions.MASTER_PHOTO_REMOVE_QUEUE,
      //   id: photoId,
      // });
    });
    // .then(() => {
    //   const queue = getState().masterEditor.info.photosQueue.items;
    //   const queueEntity = queue[0];
    //
    //   if (queue.length) {
    //     dispatch({
    //       type: actions.MASTER_PHOTO_REMOVE_QUEUE,
    //       id: queueEntity.id,
    //     });
    //     dispatch({
    //       type: actions.MASTER_PHOTO_SET_MOCK,
    //       id: queueEntity.id,
    //       modelName: queueEntity.modelName,
    //       status: constants.UPLOAD_STATUS.IN_PROCESS,
    //     });
    //
    //     uploadFileAction(queueEntity.fileData, queueEntity.modelName, queueEntity.id, dispatch, getState);
    //   } else {
    //     getState().masterEditor.uploadPhotoStatus = constants.UPLOAD_STATUS.INACTIVE;
    //   }
    // })
    // .catch(err => {
    //   console.log(err);
    // });
}

export const uploadMasterPhoto = (fileData, modelName) => (dispatch, getState) => {
  const photoId = index++;

  dispatch({
    type: actions.MASTER_PHOTO_SET_MOCK,
    id: photoId,
    modelName,
    status: getState().masterEditor.uploadPhotoStatus === constants.UPLOAD_STATUS.IN_PROCESS
      ? constants.UPLOAD_STATUS.IN_QUEUE
      : constants.UPLOAD_STATUS.IN_PROCESS
  });

  if (getState().masterEditor.uploadPhotoStatus === constants.UPLOAD_STATUS.IN_PROCESS) {
    return dispatch({
      type: actions.MASTER_PHOTO_SET_QUEUE,
      fileData,
      id: photoId,
      modelName,
    });
  }

  return uploadFileAction(fileData, modelName, photoId, dispatch, getState);
};

export const removePhoto = (itemId, modelName) => ({
  type: actions.MASTER_PHOTO_REMOVE,
  itemId,
  modelName,
});

export const setFieldValue = (modelName, value, sectionName) => ({
  type: actions.MASTER_FIELD_SET_VALUE,
  modelName,
  sectionName,
  value,
});

export const setServiceParam = (modelName, paramName, paramValue, sectionName) => ({
  type: actions.MASTER_SERVICE_SET_PARAM,
  modelName,
  paramName,
  paramValue,
  sectionName,
});

export const toogleService = (modelName, paramName, paramValue, sectionName) => ({
  type: actions.MASTER_SERVICE_TOOGLE,
  modelName,
  paramName,
  paramValue,
  sectionName,
});

export const setCalendarInterval = (modelName, id, sectionName) => ({
  type: actions.MASTER_CALENDAR_SET_INTERVAL,
  modelName,
  id,
  sectionName,
  paramValue: id,
});

export const setCalendarRecipientDate = (modelName, changes, sectionName) => ({
  type: actions.MASTER_CALENDAR_SET_RECIPIENT_DATE,
  modelName,
  changes,
  sectionName,
});

export const setCalendarField = (modelName, paramName, paramValue, sectionName) => ({
  type: actions.MASTER_CALENDAR_SET_PARAM,
  modelName,
  paramName,
  paramValue,
  sectionName,
});
