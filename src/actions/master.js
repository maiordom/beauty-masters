import { uploadFile } from '../services/upload';

import actions from '../constants/master';

let id = 0;

export const uploadMasterPersonalPhoto = (fileData, name) => dispatch => {
  const photoId = id++;

  dispatch({
    type: actions.MASTER_SET_PHOTO_MOCK,
    id: photoId,
    name,
  });

  return uploadFile(fileData)
    .then(response => response.json())
    .then(({result, file_name, sizes, media_url}) => {
      if (result) {
        dispatch({
          type: actions.MASTER_SET_PHOTO,
          fileName: file_name,
          sizes,
          mediaUrl: media_url,
          id: photoId,
          name,
        });
      }
    });
};

export const setFieldValue = (modelName, value, sectionName) => ({
  type: actions.MASTER_SET_FIELD_VALUE,
  modelName,
  value,
  sectionName,
});

export const setFieldParam = (modelName, paramName, paramValue, sectionName) => ({
  type: actions.MASTER_SET_FIELD_PARAM,
  modelName,
  paramName,
  paramValue,
  sectionName,
});

export const setItemById = (modelName, id, sectionName) => ({
  type: actions.MASTER_SET_ITEM_BY_ID,
  modelName,
  id,
  sectionName,
});

export const setCustomDate = (changes, sectionName) => ({
  type: actions.MASTER_SET_CUSTOM_DATE,
  changes,
  sectionName,
});
