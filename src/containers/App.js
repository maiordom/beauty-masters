import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { AsyncStorage } from 'react-native';
import isEmpty from 'lodash/isEmpty';
import find from 'lodash/find';

import configureStore from '../store/configureStore';
import NavigationRouter from './NavigationRouter';

import masterData from '../test/MasterData';
import { setData } from '../actions/Master';
import { refreshToken } from '../actions/Auth';
import { getUserProfile, getAddresses } from '../actions/Profile';
import { getServices, getCategoryServices } from '../actions/Dictionaries';

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

      const result = JSON.parse(res);

      if (isEmpty(result)) {
        return;
      }

      refreshToken(result.refreshToken)(store.dispatch).then(() => {
        getUserProfile()(store.dispatch, store.getState).then(() => {
          const card = find(store.getState().profile.masterCards, { isMain: true });

          if (card) {
            getAddresses(card.id)(store.dispatch);
          }
        });
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
