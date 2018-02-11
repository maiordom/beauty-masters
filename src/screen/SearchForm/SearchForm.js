// @flow
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Actions } from 'react-native-router-flux';

import concat from 'lodash/concat';
import every from 'lodash/every';
import flatMap from 'lodash/flatMap';
import groupBy from 'lodash/groupBy';
import mapValues from 'lodash/mapValues';

import {
  setDay,
  setMasterType,
  setSearchLocationName,
  toggleDeparture,
  toggleExtension,
  toggleManicure,
  togglePedicure,
  toggleService,
  toggleServiceCategory,
  toggleWithdrawal,
} from '../../actions/Search';

import { placesReset } from '../../actions/Geo';
import { setLastMapLocation } from '../../actions/Map';

import SearchForm from '../../components/SearchForm/SearchForm';
import NavBar from '../../components/NavBar';

const mapStateToProps = (state, ownProps) => {
  const {
    manicureSearchFormSections,
    pedicureSearchFormSections,
  } = state.searchForm;

  const sections = concat(manicureSearchFormSections, pedicureSearchFormSections);
  const allServices = flatMap(sections, 'services');
  const servicesByCategoryKey = groupBy(allServices, 'categoryKey');
  const categorySelectionFlags = mapValues(servicesByCategoryKey, (categoryServices) => (
    every(categoryServices, { active: true })
  ));
  const hasUserLocation = state.geo.userLocation.lat !== null;
  const hasAddressLocation = Boolean(state.searchForm.general.place.label);

  return {
    ...state.searchForm,
    categorySelectionFlags,
    hasAddressLocation,
    hasUserLocation,
    homeDeparture: state.searchForm.general.homeDeparture,
    leftButtonMenu: true,
    manicureSearchFormSections,
    pedicureSearchFormSections,
    sceneKey: ownProps.currentScene || state.scene && state.scene.sceneKey,
  };
};

const mapDispatchToProps = (dispatch) => {
  const actions = bindActionCreators({
    onSearchLocation: Actions.masterLocation,
    setDay,
    setMasterType,
    toggleDeparture,
    toggleExtension,
    toggleManicure,
    togglePedicure,
    toggleService,
    toggleServiceCategory,
    toggleWithdrawal,
  }, dispatch);

  return {
    actions: {
      ...actions,
      clearAddress() {
        dispatch(placesReset());
        dispatch(setSearchLocationName(null));
        dispatch(setLastMapLocation(null));
      },
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar(SearchForm));
