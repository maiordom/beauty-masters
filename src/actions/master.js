import { uploadFile } from '../services/upload';

import actions from '../constants/master';

let index = 0;

export const uploadMasterPhoto = (fileData, modelName) => dispatch => {
  const photoId = index++;

  dispatch({
    type: actions.MASTER_PHOTO_SET_MOCK,
    id: photoId,
    modelName,
  });

  return uploadFile(fileData)
    .then(response => response.json())
    .then(({result, file_name, sizes, media_url}) => {
      if (!result) {
        return;
      }

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

export const removeMasterPhoto = (index, modelName) => ({
  type: actions.MASTER_PHOTO_REMOVE,
  index,
  modelName,
});

export const setFieldValue = (modelName, value, sectionName) => ({
  type: actions.MASTER_FIELD_SET_VALUE,
  modelName,
  sectionName,
  value,
});

export const setFieldParam = (modelName, paramName, paramValue, sectionName) => ({
  type: actions.MASTER_FIELD_SET_PARAM,
  modelName,
  paramName,
  paramValue,
  sectionName,
});

export const setItemById = (modelName, id, sectionName) => ({
  type: actions.MASTER_ITEM_SET_ACTIVE,
  modelName,
  id,
  sectionName,
});

export const setCustomDate = (changes, sectionName) => ({
  type: actions.MASTER_CUSTOM_DATE_PUSH,
  changes,
  sectionName,
});
