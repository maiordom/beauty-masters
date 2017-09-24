import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { AsyncStorage } from 'react-native';
import isEmpty from 'lodash/isEmpty';

import configureStore from '../store/configureStore';
import NavigationRouter from './NavigationRouter';

import { refreshToken } from '../actions/Auth';
import { getUserProfile } from '../actions/Profile';
import { getLocation } from '../actions/Common';
import { getServices, getCategoryServices } from '../actions/Dictionaries';

const store = configureStore();

export default class App extends Component {
  readStorage() {
    AsyncStorage.getItem('auth').then(res => {
      console.log(`AsyncStorage::read::auth::${res}`);

      const result = JSON.parse(res);

      if (isEmpty(result)) {
        return;
      }

      refreshToken(result.refreshToken)(store.dispatch).then(() => {
        getUserProfile()(store.dispatch, store.getState);
      });
    });
  }

  componentDidMount() {
    this.readStorage();
    getServices()(store.dispatch);
    getCategoryServices()(store.dispatch);

    setTimeout(() => {
      getLocation(true)(store.dispatch);
    }, 50);
  }

  render() {
    return (
      <Provider store={store}>
        <NavigationRouter />
      </Provider>
    );
  }
}
