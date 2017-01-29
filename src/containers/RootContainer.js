import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';

import NavigationRouter from './NavigationRouter';

class RootContainer extends Component {
  render () {
    return (
      <NavigationRouter />
    );
  }
}

export default connect(null, null)(RootContainer);
