import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { AsyncStorage } from 'react-native';
import isEmpty from 'lodash/isEmpty';

import configureStore from '../store/configureStore';
import NavigationRouter from './NavigationRouter';

import { refreshToken } from '../actions/Auth';
import { getUserProfile } from '../actions/Profile';
import { getLocation } from '../actions/Common';
import {
  getCategoryServices,
  getServices,
  setCategoryServices,
  setCategoryServicesFromSources,
  setServices,
  setServicesFromSources,
} from '../actions/Dictionaries';

import categoriesData from '../data/Categories.json';
import servicesData from '../data/Services.json';

const store = configureStore();

export default class App extends Component {
  readServices() {
    AsyncStorage.getItem('services').then((res) => {
      const result = JSON.parse(res);
      console.log(`AsyncStorage::read::services::${res && result.length}`);

      if (!isEmpty(result)) {
        setServices(store.dispatch, result);
      } else {
        setServicesFromSources(servicesData.data)(store.dispatch);
      }
    });
  }

  readCategoryServices() {
    AsyncStorage.getItem('categoryServices').then((res) => {
      const result = JSON.parse(res);
      console.log(`AsyncStorage::read:categoryServices::${res && result.length}`);

      if (!isEmpty(result)) {
        setCategoryServices(store.dispatch, result);
      } else {
        setCategoryServicesFromSources(categoriesData.data)(store.dispatch);
      }
    });
  }

  readStorage() {
    AsyncStorage.getItem('auth').then((res) => {
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
  }

  render() {
    return (
      <Provider store={store}>
        <NavigationRouter />
      </Provider>
    );
  }
}
