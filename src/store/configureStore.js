import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers';

import masterSchedule from './masterSchedule';

const initialState = {
  masterSchedule,
  masterEditor: {
    personalPhotosLimit: 5,
    personalPhotos: []
  }
};

export default function configureStore() {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunkMiddleware),
  );
};
