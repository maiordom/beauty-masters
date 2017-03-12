import find from 'lodash/find';

import { makeReducer } from '../utils';

import actions from '../constants/master';

export default makeReducer((state, action) => ({
  [actions.MASTER_SET_PHOTO_MOCK]: () => {
    const photos = state.masterEditor[action.name];

    photos.push({
      type: 'mock',
      id: action.id,
    });

    state.masterEditor = Object.assign({}, state.masterEditor);
    state.masterEditor[action.name] = [...photos];

    return state;
  },

  [actions.MASTER_SET_PHOTO]: () => {
    const photos = state.masterEditor[action.name];
    const item = find(photos, {id: action.id});

    item.type = 'photo';
    item.sizes = action.sizes;
    item.mediaUrl = action.mediaUrl;
    item.fileName = action.fileName;

    state.masterEditor = Object.assign({}, state.masterEditor);
    state.masterEditor[action.name] = [...photos];

    console.log(state.masterEditor[action.name]);

    return state;
  }
}));
