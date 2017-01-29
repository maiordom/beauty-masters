import React, { Component } from 'react';
import { Scene, Router } from 'react-native-router-flux';
import { StyleSheet } from 'react-native';

import PresentationScreen from '../screen/PresentationScreen/PresentationScreen';

export default class NavigationRouter extends Component {
  render () {
    return (
      <Router sceneStyle={styles.container}>
        <Scene key="root" hideNavBar>
          <Scene initial={true} key='presentationScreen' component={PresentationScreen} />
        </Scene>
      </Router>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
