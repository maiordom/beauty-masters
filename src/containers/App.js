import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from '../store/configureStore';
import NavigationRouter from './NavigationRouter';

import masterData from '../test/MasterData';
import { setData } from '../actions/master';
import { userLogin } from '../actions/auth';
import { getServices } from '../actions/dictionaries';

const store = configureStore();

export default class App extends Component {
  setMasterData() {
    store.dispatch(setData(masterData));
  }

  login() {
    userLogin({
      username: 'admin@example.com',
      password: 'qwerty'
    })(store.dispatch);
  }

  componentDidMount() {
    getServices()(store.dispatch);
  }

  render() {
    return (
      <Provider store={store}>
        <NavigationRouter />
      </Provider>
    );
  }
}
