import { Actions } from 'react-native-router-flux';

import * as UploadService from '../services/upload';
import * as MasterService from '../services/master';

import actions from '../constants/master';
import constants from '../constants/master';

let index = 0;

function uploadFileAction(fileData, modelName, photoId, dispatch, getState) {
  getState().masterEditor.uploadPhotoStatus = constants.UPLOAD_STATUS.IN_PROCESS;

  return UploadService.uploadFile(fileData)
    .then(response => {
      try {
        return JSON.parse(response.data);
      } catch (exx) {
        console.log('[UploadFile]::exception', exx);
      }
    })
    .then(({ result, file_name, sizes, media_url }) => {
      if (!result) {
        return;
      }

      console.log('[UploadFile]::fileName', file_name);

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
          status: constants.UPLOAD_STATUS.IN_PROCESS,
        });

        uploadFileAction(fileData, modelName, id, dispatch, getState);
      } else {
        getState().masterEditor.uploadPhotoStatus = constants.UPLOAD_STATUS.INACTIVE;
      }
    });
}

export const createMaster = () => (dispatch, getState) => {
  const createMasterQuery = getState().masterEditor.createMasterQuery;

  return MasterService.createMaster({ master: createMasterQuery })
    .then(response => {
      if (response.result) {
        Actions.createMasterSuccess();
      }
    });
};

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

export const setData = data => ({
  type: actions.MASTER_DATA_SET,
  data,
});

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
