import React from 'react';
import { connect } from 'react-redux';
import { Scene, Router } from 'react-native-router-flux';
import { StyleSheet } from 'react-native';

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

import Serp from '../screen/Serp/Serp';
import MasterCard from '../screen/MasterCard/MasterCard';
import MasterLocation from '../screen/MasterCard/MasterLocation';

import MasterProfile from './MasterProfile/MasterProfile';
import MasterProfileCalendar from './MasterProfile/MasterProfileCalendar';
import Drawer from '../components/Drawer';

import Favorites from '../screen/Favorites/Favorites';
import UserAgreement from '../screen/UserAgreement/UserAgreement';
import Feedback from '../screen/Feedback/Feedback';

import i18n from '../i18n';

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

const RouterWithRedux = connect()(Router);

export default () => (
  <RouterWithRedux sceneStyle={styles.container}>
    <Scene key="drawer" component={Drawer}>
      <Scene
        key="root"
        hideNavBar
        animationStyle="leftToRight"
      >
        <Scene
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
        <Scene
          key="Serp"
          {...getMasterStyle()}
          title={i18n.search.search}
          component={Serp}
        />
        <Scene key="card" component={MasterCard} />
        <Scene key="masterLocation" component={MasterLocation} title="Место приема мастера" />
        <Scene
          key="masterAuthorization"
          component={MasterAuthorization}
        />
        <Scene
          key="masterEditorGeneral"
          {...getMasterStyle()}
          title={i18n.masterEditor.generalInformation}
          component={MasterEditorGeneral}
        />
        <Scene
          initial
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
          leftButtonHidden
        />
        <Scene
          key="masterProfile"
          component={MasterProfile}
          title={i18n.userProfile}
        />
        <Scene
          key="masterProfileCalendar"
          component={MasterProfileCalendar}
        />
        <Scene
          key="favorite"
          component={Favorites}
          title={i18n.favorites}
        />
        <Scene
          key="userAgreement"
          component={UserAgreement}
        />
        <Scene
          key="feedback"
          component={Feedback}
          title={i18n.feedback}
        />
      </Scene>
    </Scene>
  </RouterWithRedux>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
