import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { AsyncStorage } from 'react-native';
import isEmpty from 'lodash/isEmpty';
import axios from 'axios';

import configureStore from '../store/configureStore';
import NavigationRouter from './NavigationRouter';

import { refreshToken } from '../actions/Auth';
import { getUserProfile } from '../actions/Profile';
import { requestGeoAuthorization } from '../actions/Common';
import {
  getCategoryServices,
  getServices,
  setCategoryServices,
  setCategoryServicesFromSources,
  setServices,
  setServicesFromSources,
} from '../actions/Dictionaries';

import { log } from '../utils/Log';

import { masterEditCityModelSet } from '../actions/Master';
import { setRawCities } from '../actions/Geo';

import categoriesData from '../data/Categories.json';
import servicesData from '../data/Services.json';
import citiesData from '../data/Cities.json';

import { handleResolveResponse, handleRejectResponse } from '../utils/Provider';

const store = configureStore();

axios.interceptors.response.use(
  (res) => res,
  (error) => {
    const state = store.getState();
    if (error.response.status ===  401) {
      const { config } = error.response;

      log(`${config.url}::${config.method.toUpperCase()}::401::response`);

      return refreshToken(state.auth.refreshToken)(store.dispatch).then((res) => {
        if (!res.error) {
          const { auth } = store.getState();

          config.headers.Authorization = `${auth.tokenType} ${auth.accessToken}`;

          log(`${config.url}::${config.method.toUpperCase()}::request::interception`);

          return axios.request(config)
            .then((res: Object) => handleResolveResponse(res, config.url, config.method))
            .catch((exx: Object) => handleRejectResponse(exx.response, config.path, config.method));
        } else {
          return Promise.resolve(error);
        }
      });
    }

    return Promise.resolve(error.response);
  }
);

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

      refreshToken(result.refreshToken)(store.dispatch).then((res) => {
        if (!res.error) {
          getUserProfile()(store.dispatch, store.getState);
        }
      });
    });
  }

  componentDidMount() {
    this.readStorage();
    this.readServices();
    this.readCategoryServices();
    getServices()(store.dispatch);
    getCategoryServices()(store.dispatch);
    setRawCities(citiesData);
    masterEditCityModelSet(store.getState().geo.cities);

    requestGeoAuthorization();
  }

  render() {
    return (
      <Provider store={store}>
        <NavigationRouter />
      </Provider>
    );
  }
}
