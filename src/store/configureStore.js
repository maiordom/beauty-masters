import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers';

import masterSchedule from './masterSchedule';

const initialState = {
  masterSchedule,
  masterEditor: {
    personalPhotosLimit: 5,
    personalPhotos: [],
    certificatePhotos: [],
    certificatePhotosLimit: 10,
    passportPhotos: [],
    passportPhotosLimit: 1,
    workPhotos: [],
    workPhotosLimit: 15,
  }
};

export default function configureStore() {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunkMiddleware),
  );
};
