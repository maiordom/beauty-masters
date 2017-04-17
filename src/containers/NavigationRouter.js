import React, { Component } from 'react';
import { Scene, Router } from 'react-native-router-flux';
import { StyleSheet, Platform } from 'react-native';

import Presentation from '../screen/Presentation/Presentation';
import MasterAuthorization from '../screen/MasterAuthorization/MasterAuthorization';
import MasterEditorGeneral from '../screen/MasterEditor/MasterEditorGeneral';
import MasterEditorService from '../screen/MasterEditor/MasterEditorService';
import MasterEditorHandlingTools from '../screen/MasterEditor/MasterEditorHandlingTools';
import MasterEditorCalendar from '../screen/MasterEditor/MasterEditorCalendar';
import MasterEditorCalendarSettings from '../screen/MasterEditor/MasterEditorCalendarSettings';
import MasterEditorInfo from '../screen/MasterEditor/MasterEditorInfo';

import SearchForm from '../screen/SearchForm/SearchForm';
import SearchFormAddress from '../screen/SearchForm/SearchFormAddress';
import SearchCity from '../screen/SearchForm/SearchFormCity';

import Drawer from '../components/Drawer';

import i18n from '../i18n';
import vars from '../vars';

const getSceneStyle = () => ({
  ...Platform.select({
    ios: {
      paddingTop: 64,
    },
    android: {
      paddingTop: 54,
    },
  }),
});

function getMasterStyle(options = {}) {
  let leftButtonIconStyle;

  switch (options.navButtonType) {
    case 'menu':
      leftButtonIconStyle = { width: 20, height: 18 }; break;
    default:
      leftButtonIconStyle = { width: 24, height: 24 };
  }

  const leftButtonStyle = {
    padding: 0,
    alignItems: 'center',
    left: 16,
  };

  const titleStyle = {
    width: 265,
    fontSize: 20,
    color: vars.color.white,
  };

  const navigationBarStyle = {
    backgroundColor: vars.color.red,
    borderBottomWidth: 0,
  };

  const titleWrapperStyle = {
    marginTop: 8,
  };

  const hideNavBar = false;

  let backButtonImage;

  switch (options.navButtonType) {
    case 'menu':
      backButtonImage = require('../icons/menu.png');
      break;
    default:
      backButtonImage = require('../icons/android/back-arrow.png');
  }

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

export default () => (
  <Router sceneStyle={styles.container}>
    <Scene key="drawer" component={Drawer}>
      <Scene
        initial
        key="root"
        hideNavBar
        animationStyle="leftToRight"
      ><Scene
        key="presentation"
        component={Presentation}
      />
        <Scene
          key="searchForm"
          {...getMasterStyle({ navButtonType: 'menu' })}
          title={i18n.search.searchParams}
          getSceneStyle={getSceneStyle}
          component={SearchForm}
        />
        <Scene
          key="searchCity"
          {...getMasterStyle()}
          title={'Город'}
          getSceneStyle={getSceneStyle}
          component={SearchCity}
        />
        <Scene
          key="searchAddress"
          {...getMasterStyle()}
          title={i18n.search.masterPlace}
          getSceneStyle={getSceneStyle}
          component={SearchFormAddress}
        />
        <Scene key="masterAuthorization" component={MasterAuthorization} />
        <Scene key="masterEditorGeneral"
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


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
