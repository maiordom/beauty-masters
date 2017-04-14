import React, { Component } from 'react';
import { Scene, Router } from 'react-native-router-flux';
import { StyleSheet, Dimensions, Platform, Text } from 'react-native';
import { connect } from 'react-redux';

import Presentation from '../screen/Presentation/Presentation';
import MasterAuthorization from '../screen/MasterAuthorization/MasterAuthorization';
import MasterEditorGeneral from '../screen/MasterEditor/MasterEditorGeneral';
import MasterEditorService from '../screen/MasterEditor/MasterEditorService';
import MasterEditorHandlingTools from '../screen/MasterEditor/MasterEditorHandlingTools';
import MasterEditorCalendar from '../screen/MasterEditor/MasterEditorCalendar';
import MasterEditorCalendarSettings from '../screen/MasterEditor/MasterEditorCalendarSettings';
import MasterEditorInfo from '../screen/MasterEditor/MasterEditorInfo';

import Drawer from '../components/Drawer';

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

function getMasterStyle() {
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
    width: 265,
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
    backButtonImage,
  };
}

export default class NavigationRouter extends Component {
  render() {
    return (
      <Router sceneStyle={styles.container}>
        <Scene key="drawer" component={Drawer}>
          <Scene
            initial
            key="root"
            hideNavBar
            animationStyle="leftToRight"
          >
            <Scene
              key="presentation"
              component={Presentation}
            />
            <Scene
              key="masterAuthorization"
              component={MasterAuthorization}
            />
            <Scene
              key="masterEditorGeneral"
              {...getMasterStyle()}
              leftButtonIconStyle={{ width: 0, height: 0 }}
              title={i18n.masterEditor.generalInformation}
              getSceneStyle={getSceneStyle}
              component={MasterEditorGeneral}
            />
            <Scene
              key="masterEditorService"
              {...getMasterStyle()}
              title={i18n.masterEditor.services}
              getSceneStyle={getSceneStyle}
              component={MasterEditorService}
            />
            <Scene
              key="masterEditorHandlingTools"
              {...getMasterStyle()}
              title={i18n.masterEditor.handlingTools}
              getSceneStyle={getSceneStyle}
              component={MasterEditorHandlingTools}
            />
            <Scene
              key="masterEditorCalendar"
              {...getMasterStyle()}
              title={i18n.masterEditor.schedule}
              getSceneStyle={getSceneStyle}
              component={MasterEditorCalendar}
            />
            <Scene
              key="masterEditorCalendarSetting"
              {...getMasterStyle()}
              title={i18n.masterEditor.calendarSettings}
              getSceneStyle={getSceneStyle}
              component={props => <MasterEditorCalendarSettings {...props} />}
            />
            <Scene
              key="masterEditorInfo"
              {...getMasterStyle()}
              title={i18n.masterEditor.additionalInformation}
              getSceneStyle={getSceneStyle}
              component={MasterEditorInfo}
            />
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
