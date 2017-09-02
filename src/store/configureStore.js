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
  dictionaries: {},
  favorites: { isLoaded: false, cards: [] },
  geo: {
    places: [],
    city: {
      name: 'Москва',
      location: {
        lat: 55.755826,
        lng: 37.6172999,
      },
    },
  },
  masterCards: {},
  masterEditor: MasterEditor,
  searchForm: SearchForm,
};

export default function configureStore() {
  return createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunkMiddleware),
  );
}
