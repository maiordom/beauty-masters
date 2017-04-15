import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from '../store/configureStore';
import RootContainer from './RootContainer';

const store = configureStore();

import masterData from '../test/MasterData';
import { setData } from '../actions/master';
import { registerUser } from '../actions/auth';

export default class App extends Component {
  setMasterData() {
    store.dispatch(setData(masterData));
  }

  registerUser() {
    registerUser('maiordom@yandex.ru', 'qwerty')();
  }

  render () {
    return (
      <Provider store={store}>
        <RootContainer />
      </Provider>
    );
  }
}
