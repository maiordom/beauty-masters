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
import MasterEditorCreateSuccess from '../screen/MasterEditor/MasterEditorCreateSuccess';

import SearchForm from '../screen/SearchForm/SearchForm';
import SearchFormAddress from '../screen/SearchForm/SearchFormAddress';
import SearchCity from '../screen/SearchForm/SearchFormCity';

import Drawer from '../components/Drawer';

import i18n from '../i18n';
import vars from '../vars';

function getMasterStyle(options = {}) {
  let leftButtonIconStyle;

  switch (options.navButtonType) {
    case 'menu':
      leftButtonIconStyle = { width: 20, height: 18 }; break;
    default:
      leftButtonIconStyle = { width: 24, height: 24 };
  }

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
    backButtonImage,
  };
}

export default () => (
  <Router sceneStyle={styles.container}>
    <Scene key="drawer" component={Drawer}>
      <Scene
        key="root"
        hideNavBar
        animationStyle="leftToRight"
      >
        <Scene
          initial
          key="presentation"
          component={Presentation}
        />
        <Scene
          key="searchForm"
          {...getMasterStyle({ navButtonType: 'menu' })}
          title={i18n.search.searchParams}
          component={SearchForm}
        />
        <Scene
          key="searchCity"
          {...getMasterStyle()}
          title={'Город'}
          component={SearchCity}
        />
        <Scene
          key="searchAddress"
          {...getMasterStyle()}
          title={i18n.search.masterPlace}
          component={SearchFormAddress}
        />
        <Scene key="masterAuthorization" component={MasterAuthorization} />
        <Scene key="masterEditorGeneral"
          {...getMasterStyle()}
          title={i18n.masterEditor.generalInformation}
          component={MasterEditorGeneral}
        />
        <Scene
          key="masterEditorService"
          {...getMasterStyle()}
          title={i18n.masterEditor.services}
          component={MasterEditorService}
        />
        <Scene
          key="masterEditorHandlingTools"
          {...getMasterStyle()}
          title={i18n.masterEditor.handlingTools}
          component={MasterEditorHandlingTools}
        />
        <Scene
          key="masterEditorCalendar"
          {...getMasterStyle()}
          title={i18n.masterEditor.schedule}
          component={MasterEditorCalendar}
        />
        <Scene
          key="masterEditorCalendarSetting"
          {...getMasterStyle()}
          title={i18n.masterEditor.calendarSettings}
          component={props => <MasterEditorCalendarSettings {...props} />}
        />
        <Scene
          key="masterEditorInfo"
          {...getMasterStyle()}
          title={i18n.masterEditor.additionalInformation}
          component={MasterEditorInfo}
        />
        <Scene
          key="createMasterSuccess"
          {...getMasterStyle()}
          title={i18n.registrationComplete.sceneTitle}
          component={MasterEditorCreateSuccess}
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
