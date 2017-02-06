import React, { Component } from 'react';
import { Scene, Router } from 'react-native-router-flux';
import { StyleSheet } from 'react-native';

import Presentation from '../screen/Presentation/Presentation';
import MasterAuthorization from '../screen/MasterAuthorization/MasterAuthorization';

export default class NavigationRouter extends Component {
  render () {
    return (
      <Router sceneStyle={styles.container}>
        <Scene key="root" hideNavBar animationStyle="leftToRight">
          <Scene key='presentation' component={Presentation} />
          <Scene initial key="masterAuthorization" component={MasterAuthorization} />
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
