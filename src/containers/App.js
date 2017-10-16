import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { AsyncStorage, Platform, Linking } from 'react-native';
import isEmpty from 'lodash/isEmpty';
import { Actions } from 'react-native-router-flux';

import configureStore from '../store/configureStore';
import NavigationRouter from './NavigationRouter';

import { refreshToken } from '../actions/Auth';
import { getUserProfile } from '../actions/Profile';
import { getLocation } from '../actions/Common';
import {
  getCategoryServices,
  getServices,
  setCategoryServices,
  setServices,
} from '../actions/Dictionaries';

const store = configureStore();

export default class App extends Component {
  readServices() {
    AsyncStorage.getItem('services').then(res => {
      const result = JSON.parse(res);

      if (!isEmpty(result)) {
        setServices(store.dispatch, result);
      }
    });
  }

  readCategoryServices() {
    AsyncStorage.getItem('categoryServices').then(res => {
      const result = JSON.parse(res);

      if (!isEmpty(result)) {
        setCategoryServices(store.dispatch, result);
      }
    });
  }

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
    this.readServices();
    this.readCategoryServices();
    getServices()(store.dispatch);
    getCategoryServices()(store.dispatch);

    setTimeout(() => {
      getLocation(true)(store.dispatch);
    }, 50);

    Linking.getInitialURL().then(url => {
      if (!url) {
        return;
      }
      this.navigate(url);
    });
  }

  navigate = (url) => {
    const route = url.replace(/.*?:\/\//g, '');
    const token = route.match(/\/([^/]+)\/?$/)[1];
    const routeName = route.split('/')[1];

    if (routeName === 'reset-pwd') {
      Actions.masterSetNewPwd({ token });
    }
  }


  render() {
    return (
      <Provider store={store}>
        <NavigationRouter />
      </Provider>
    );
  }
}
