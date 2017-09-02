import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger'; // eslint-disable-line

import rootReducer from '../reducers';

import MasterEditor from './MasterEditor';
import Geo from './Geo';
import SearchForm from './SearchForm';

const initialState = {
  activityIndicator: { animating: false },
  auth: {},
  dictionaries: {},
  favorites: { isLoaded: false, cards: [] },
  geo: Geo,
  masterCards: {},
  masterEditor: MasterEditor,
  profile: { masterCards: [] },
  searchForm: SearchForm,
};

export default function configureStore() {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunkMiddleware),
  );
}
