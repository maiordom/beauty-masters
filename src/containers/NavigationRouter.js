import React from 'react';
import { connect } from 'react-redux';
import { Scene, Router } from 'react-native-router-flux';
import { StyleSheet } from 'react-native';

import Presentation from '../screen/Presentation/Presentation';
import MasterAuthorization from '../screen/MasterAuthorization/MasterAuthorization';
import MasterRecoverPassword from '../screen/MasterAuthorization/MasterRecoverPassword';
import MasterEditorGeneral from '../screen/MasterEditor/MasterEditorGeneral';
import MasterEditorService from '../screen/MasterEditor/MasterEditorService';
import MasterEditorHandlingTools from '../screen/MasterEditor/MasterEditorHandlingTools';
import MasterEditorCalendar from '../screen/MasterEditor/MasterEditorCalendar';
import MasterEditorCalendarSettings from '../screen/MasterEditor/MasterEditorCalendarSettings';
import MasterEditorCity from '../screen/MasterEditor/MasterEditorCity';
import MasterEditorSubwayStation from '../screen/MasterEditor/MasterEditorSubwayStation';
import MasterEditorInfo from '../screen/MasterEditor/MasterEditorInfo';
import MasterEditorCreateSuccess from '../screen/MasterEditor/MasterEditorCreateSuccess';

import SearchForm from '../screen/SearchForm/SearchForm';
import SearchFormAddress from '../screen/SearchForm/SearchFormAddress';
import SearchCity from '../screen/SearchForm/SearchFormCity';

import Serp from '../screen/Serp/Serp';
import MasterCard from '../screen/MasterCard/MasterCard';
import MasterLocation from '../screen/MasterCard/MasterLocation';

import MasterProfile from '../screen/MasterProfile/MasterProfile';
import MasterProfileCalendar from '../screen/MasterProfile/MasterProfileCalendar';
import MasterProfileSelectProfile from '../screen/MasterProfile/MasterProfileSelectProfile';

import Favorites from '../screen/Favorites/Favorites';
import UserAgreement from '../screen/UserAgreement';
import Privacy from '../screen/Privacy';
import Feedback from '../screen/Feedback/Feedback';
import CardPlacementConditions from '../screen/CardPlacementConditions';

import Sidebar from '../containers/Sidebar';

import CalendarAddressAutocomplete from '../screen/CalendarAddressAutocomplete';

import i18n from '../i18n';

const RouterWithRedux = connect()(Router);

export default () => (
  <RouterWithRedux sceneStyle={styles.container}>
    <Scene
      key="root"
      hideNavBar
    >
      <Scene key="drawer" component={Sidebar} />
      <Scene
        initial
        key="presentation"
        component={Presentation}
      />
      <Scene
        key="searchForm"
        title={i18n.search.searchParams}
        component={SearchForm}
      />
      <Scene
        key="searchCity"
        title="Город"
        component={props => <SearchCity {...props} placeholder={i18n.enterCity} />}
      />
      <Scene
        key="searchAddress"
        title={i18n.search.masterPlace}
        component={SearchFormAddress}
      />
      <Scene
        key="serp"
        title={i18n.search.search}
        component={Serp}
      />
      <Scene
        key="card"
        component={MasterCard}
      />
      <Scene
        key="masterLocation"
        component={MasterLocation}
        title={i18n.location.receiveMasterLocation}
      />
      <Scene
        key="masterAuthorization"
        component={MasterAuthorization}
      />
      <Scene
        key="masterRecoverPassword"
        component={MasterRecoverPassword}
        title={i18n.forgotPassword.title}
      />
      <Scene
        key="masterEditorGeneral"
        title={i18n.masterEditor.generalInformation}
        component={MasterEditorGeneral}
      />
      <Scene
        key="masterEditorService"
        title={i18n.masterEditor.services}
        component={MasterEditorService}
      />
      <Scene
        key="masterEditorHandlingTools"
        title={i18n.masterEditor.handlingTools}
        component={MasterEditorHandlingTools}
      />
      <Scene
        key="masterEditorCalendar"
        title={i18n.masterEditor.schedule}
        component={MasterEditorCalendar}
      />
      <Scene
        key="masterEditorCalendarSetting"
        title={i18n.masterEditor.calendarSettings}
        component={props => <MasterEditorCalendarSettings {...props} />}
      />
      <Scene
        key="calendarAddressAutocomplete"
        title={i18n.chooseAddress}
        component={props => <CalendarAddressAutocomplete {...props} />}
      />
      <Scene
        key="masterEditorCity"
        title={i18n.city}
        component={props => <MasterEditorCity {...props} placeholder={i18n.enterCity} />}
      />
      <Scene
        key="masterEditorSubwayStation"
        title={i18n.subwayStation}
        component={props => <MasterEditorSubwayStation {...props} placeholder={i18n.enterSubwayStation} />}
      />
      <Scene
        key="masterEditorInfo"
        title={i18n.masterEditor.additionalInformation}
        component={MasterEditorInfo}
      />
      <Scene
        key="createMasterSuccess"
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
        key="masterProfileSelectProfile"
        title={i18n.userProfile}
        component={MasterProfileSelectProfile}
      />
      <Scene
        key="favorite"
        component={Favorites}
        title={i18n.favorites}
      />
      <Scene
        component={UserAgreement}
        key="userAgreement"
        title={i18n.userAgreementShort}
      />
      <Scene
        component={CardPlacementConditions}
        key="cardPlacementConditions"
        title={i18n.placementConditions}
      />
      <Scene
        component={Privacy}
        key="privacy"
        title={i18n.privacy}
      />
      <Scene
        key="feedback"
        component={Feedback}
        title={i18n.feedback}
      />
    </Scene>
  </RouterWithRedux>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
});
