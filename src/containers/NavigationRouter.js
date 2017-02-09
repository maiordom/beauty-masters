import React, { Component } from 'react';
import { Scene, Router } from 'react-native-router-flux';
import { StyleSheet, Dimensions, Platform } from 'react-native';

import Presentation from '../screen/Presentation/Presentation';
import MasterAuthorization from '../screen/MasterAuthorization/MasterAuthorization';
import MasterEditorGeneral from '../screen/MasterEditor/MasterEditorGeneral';
import MasterEditorService from '../screen/MasterEditor/MasterEditorService';

import i18n from '../i18n';
import vars from '../vars';

const getSceneStyle = () => ({
  ...Platform.select({
    ios: {
      paddingTop: 64
    },
    android: {
      paddingTop: 54
    }
  })
});

const getMasterStyle = () => {
  const leftButtonIconStyle = {
    width: 24,
    height: 24
  };

  const leftButtonStyle = {
    padding: 0,
    alignItems: 'center',
    left: 16
  };

  const titleStyle = {
    width: Dimensions.get('window').width - 15 * 2,
    fontSize: 20,
    color: vars.color.white
  };

  const navigationBarStyle = {
    backgroundColor: vars.color.red,
    borderBottomWidth: 0
  };

  const titleWrapperStyle = {
    marginTop: 8
  };

  const hideNavBar = false;

  const backButtonImage = require('../icons/android/back-arrow.png');

  return {
    leftButtonIconStyle,
    leftButtonStyle,
    titleStyle,
    navigationBarStyle,
    titleWrapperStyle,
    hideNavBar,
    backButtonImage
  };
};

export default class NavigationRouter extends Component {
  render () {
    return (
      <Router sceneStyle={styles.container}>
        <Scene key="root" hideNavBar animationStyle="leftToRight">
          <Scene key="presentation" component={Presentation} />
          <Scene key="masterAuthorization" component={MasterAuthorization} />
          <Scene initial key="masterEditor" {...getMasterStyle()}>
            <Scene key="masterEditorGeneral" title={i18n.masterEditor.title.stepOne} getSceneStyle={getSceneStyle} component={MasterEditorGeneral} />
            <Scene key="masterEditorService" title={i18n.masterEditor.title.stepTwo} getSceneStyle={getSceneStyle} component={MasterEditorService} />
          </Scene>
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
