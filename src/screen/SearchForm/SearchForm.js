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
  setItemById,
  toggleDeparture,
  toggleExtension,
  toggleManicure,
  togglePedicure,
  toggleService,
  toggleServiceCategory,
  toggleWithdrawal,
} from '../../actions/Search';

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

  return {
    categorySelectionFlags,
    manicureSearchFormSections,
    pedicureSearchFormSections,
    ...state.searchForm,
    leftButtonMenu: true,
    sceneKey: ownProps.currentScene || state.scene.sceneKey,
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    onSearchLocation: Actions.masterLocation,
    setDay,
    setItemById,
    toggleDeparture,
    toggleExtension,
    toggleManicure,
    togglePedicure,
    toggleService,
    toggleServiceCategory,
    toggleWithdrawal,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar(SearchForm));
