import { makeReducer } from '../utils';

import actions from '../constants/master';

export default makeReducer((state, action) => ({
  [actions.MASTER_SET_PERSONAL_PHOTO]: () => {
    const { personalPhotos } = state.masterEditor;

    personalPhotos.push({
      sizes: action.sizes,
      mediaUrl: action.mediaUrl,
      fileNamae: actions.fileName,
    });

    state.masterEditor = Object.assign({}, state.masterEditor);
    state.masterEditor.personalPhotos = [...personalPhotos];

    return state;
  }
}));
