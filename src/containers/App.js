import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from '../store/configureStore';
import RootContainer from './RootContainer';

const store = configureStore();

import masterData from '../test/MasterData';
import { setData } from '../actions/master';

export default class App extends Component {
  setMasterData() {
    store.dispatch(setData(masterData));
  }

  render () {
    return (
      <Provider store={store}>
        <RootContainer />
      </Provider>
    );
  }
}
