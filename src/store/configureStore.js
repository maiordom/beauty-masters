import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from '../reducers';

import MasterEditor from './MasterEditor';

const initialState = {
  masterEditor: {
    ...MasterEditor,
  }
};

export default function configureStore() {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunkMiddleware),
  );
};
