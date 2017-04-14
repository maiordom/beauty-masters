import { uploadFile } from '../services/upload';

import actions from '../constants/master';

let index = 0;

export const uploadMasterPhoto = (data, modelName) => dispatch => {
  const photoId = index++;

  dispatch({
    type: actions.MASTER_PHOTO_SET_MOCK,
    id: photoId,
    modelName,
  });

  return uploadFile(data)
    .then(response => {
      try {
        return JSON.parse(response.data);
      } catch (exx) {
        console.log(exx);
      }
    })
    .then(({ result, file_name, sizes, media_url }) => {
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
    }).catch(err => {
      console.log(err);
    });
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
