import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger'; // eslint-disable-line
import rootReducer from '../reducers';

import MasterEditor from './MasterEditor';
import SearchForm from './SearchForm';

const initialState = {
  activityIndicator: {
    animating: false,
  },
  auth: {},
  dictionaries: {
    services: {},
    serviceByKey: {},
  },
  masterEditor: MasterEditor,
  searchForm: SearchForm,
  masterCards: {},
  favorites: {
    isLoaded: false,
    cards: [],
  },
  userMasters: [{
    avatar: null,
    username: 'Елена Трепышина 1',
    isMain: true
  }, {
    avatar: null,
    username: 'Елена Трепышина 2',
    isMain: false
  }]
};

export default function configureStore() {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunkMiddleware),
  );
}
