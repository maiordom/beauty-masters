import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { AsyncStorage } from 'react-native';

import configureStore from '../store/configureStore';
import NavigationRouter from './NavigationRouter';

import masterData from '../test/MasterData';
import { setData } from '../actions/master';
import { refreshToken } from '../actions/auth';
import { getUserProfile } from '../actions/profile';
import { getServices, getCategoryServices } from '../actions/dictionaries';

const store = configureStore();

export default class App extends Component {
  setMasterData() {
    store.dispatch(setData(masterData));
  }

  getLocation() {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
    });
  }

  readStorage() {
    AsyncStorage.getItem('auth').then(res => {
      console.log(`AsyncStorage::read::auth::${res}`);

      if (!res) {
        return;
      }

      const authData = JSON.parse(res);

      refreshToken(authData.refreshToken)(store.dispatch).then(() => {
        getUserProfile()(store.dispatch, store.getState);
      });
    });
  }

  componentDidMount() {
    this.readStorage();
    getServices()(store.dispatch);
    getCategoryServices()(store.dispatch);
  }

  render() {
    return (
      <Provider store={store}>
        <NavigationRouter />
      </Provider>
    );
  }
}
