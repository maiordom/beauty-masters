// @flow
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Actions } from 'react-native-router-flux';

import concat from 'lodash/concat';
import every from 'lodash/every';
import flatMap from 'lodash/flatMap';
import groupBy from 'lodash/groupBy';
import mapValues from 'lodash/mapValues';

import type { TSearchFormCategorySection } from '../../types/SearchFormCategories';

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

import i18n from '../../i18n';

const mapStateToProps = (state, ownProps) => {
  const {
    serviceManicure,
    servicePedicure,
  } = state.searchForm;

  const manicureSearchFormSections: Array<TSearchFormCategorySection> = [
    {
      title: i18n.filters.nailProcessingMethod,
      services: [
        serviceManicure.classicManicure,
        serviceManicure.hardwareManicure,
        serviceManicure.europeanManicure,
      ],
    },
    {
      title: i18n.filters.coverage,
      services: [
        serviceManicure.applyingShellacManicure,
        serviceManicure.applyingBioGelManicure,
        serviceManicure.applyingNailPolishManicure,
      ],
    },
    {
      title: i18n.filters.withdrawal,
      services: [
        serviceManicure.removingNailPolishManicure,
        serviceManicure.removingBioGelManicure,
        serviceManicure.removingShellacManicure,
        serviceManicure.removingGelManicure,
        serviceManicure.removingNailsManicure,
      ],
    },
    {
      title: i18n.filters.otherServices,
      services: [
        serviceManicure.designManicure,
        serviceManicure.extensionManicure,
      ],
    },
  ];
  const pedicureSearchformSections: Array<TSearchFormCategorySection> = [
    {
      title: i18n.filters.nailProcessingMethod,
      services: [
        servicePedicure.classicPedicure,
        servicePedicure.hardwarePedicure,
        servicePedicure.europeanPedicure,
      ],
    },
    {
      title: i18n.filters.coverage,
      services: [
        servicePedicure.applyingShellacPedicure,
        servicePedicure.applyingBioGelPedicure,
        servicePedicure.applyingNailPolishPedicure,
      ],
    },
    {
      title: i18n.filters.withdrawal,
      services: [
        servicePedicure.removingNailPolishPedicure,
        servicePedicure.removingBioGelPedicure,
        servicePedicure.removingShellacPedicure,
        servicePedicure.removingGelPedicure,
        servicePedicure.removingNailsPedicure,
      ],
    },
    {
      title: i18n.filters.otherServices,
      services: [
        servicePedicure.designPedicure,
        servicePedicure.extensionPedicure,
      ],
    },
  ];
  const sections = concat(manicureSearchFormSections, pedicureSearchformSections);
  const allServices = flatMap(sections, 'services');
  const servicesByCategoryKey = groupBy(allServices, 'categoryKey');
  const categorySelectionFlags = mapValues(servicesByCategoryKey, (categoryServices) => (
    every(categoryServices, { active: true })
  ));

  return {
    categorySelectionFlags,
    manicureSearchFormSections,
    pedicureSearchformSections,
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
