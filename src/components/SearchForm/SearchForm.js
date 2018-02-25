// @flow

import React, { PureComponent } from 'react';
import { View, StyleSheet, Platform, ScrollView, InteractionManager } from 'react-native';
import { Actions } from 'react-native-router-flux';
import find from 'lodash/find';
import each from 'lodash/each';
import moment from 'moment';
import 'moment/locale/ru';
import snakeCase from 'lodash/snakeCase';

import SearchFormCalendar from './SearchFormCalendar';
import SearchFormMasterType from './SearchFormMasterType';
import SearchFormCategoryBlock from './SearchFormCategoryBlock';

import StateMachine from '../../components/StateMachine';
import { FilterLabel } from '../../components/FilterLabel';
import FilterTab from '../../components/Filter';
import FilterCheckBox from '../../components/FilterCheckBox';
import ButtonControl from '../../components/ButtonControl';

import vars from '../../vars';
import i18n from '../../i18n';
import { capitalizeFirstLetter } from '../../utils';
import { trackEvent } from '../../utils/Tracker';

import type { TSearchFormCategorySection } from '../../types/SearchFormCategories';

type TProps = {
  actions: {
    clearAddress: Function,
    setDay: Function,
    setMasterType: Function,
    toggleDeparture: Function,
    toggleExtension: Function,
    toggleManicure: Function,
    togglePedicure: Function,
    toggleService: Function,
    toggleServiceCategory: Function,
    toggleWithdrawal: Function,
  },
  categorySelectionFlags: {
    extension: boolean,
    manicure: boolean,
    pedicure: boolean,
    removing: boolean,
  },
  general: Object,
  hasAddressLocation: boolean,
  hasUserLocation: boolean,
  homeDeparture: Object,
  manicureSearchFormSections: Array<TSearchFormCategorySection>,
  pedicureSearchFormSections: Array<TSearchFormCategorySection>,
  searchQuery: Object,
};

type TState = {
  renderContent: boolean,
  showMasterCalendarModal: boolean,
  showMasterTypeModal: boolean,
  showShortForm: boolean,
};

export default class SearchFormShort extends PureComponent<TProps, TState> {
  state = {
    renderContent: false,
    selectedDates: this.props.searchQuery.dates.slice(),
    showShortForm: true,
    showMasterCalendarModal: false,
    showMasterTypeModal: false,
  };

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({ renderContent: true });
    });
  }

  componentWillReceiveProps(props) {
    this.setState({ selectedDates: props.searchQuery.dates.slice() });
  }

  toggleForm = () => {
    this.setState({ showShortForm: !this.state.showShortForm });
  };

  onServiceToggle = (sectionName: string) => (value: boolean, modelName: string) => {
    if (value) {
      trackEvent('selectService', { labelValue: snakeCase(modelName) });
    }

    this.props.actions.toggleService(modelName, 'active', value, sectionName);
  };

  onCategoryToggle = (sectionName: string) => (value: boolean, modelName: string) => {
    if (value) {
      trackEvent('selectService', { labelValue: snakeCase(modelName) });
    }

    this.props.actions.toggleServiceCategory(modelName, 'active', value, sectionName);
  };

  onExtensionToggle = (value: boolean) => {
    if (value) {
      trackEvent('selectFilterExtension');
    }

    this.props.actions.toggleExtension(value);
  };

  onWithdrawalToggle = (value: boolean) => {
    if (value) {
      trackEvent('selectFilterRemove');
    }

    this.props.actions.toggleWithdrawal(value);
  }

  onManicureToggle = (value: boolean) => {
    if (value) {
      trackEvent('selectFilterManicure');
    }

    this.props.actions.toggleManicure(value);
  }

  onPedicureToggle = (value: boolean) => {
    if (value) {
      trackEvent('selectFilterPedicure');
    }

    this.props.actions.togglePedicure(value);
  }

  onDepartureToggle = () => this.props.actions.toggleDeparture();

  toggleMasterTypeModal = () => this.setState({ showMasterTypeModal: !this.state.showMasterTypeModal });

  toggleCalendarModal = () => this.setState({ showMasterCalendarModal: !this.state.showMasterCalendarModal });

  onMasterTypeSelect = (value: string, id: number, modelName: string) => {
    this.props.actions.setMasterType(modelName, id, 'general');
    this.toggleMasterTypeModal();
  };

  onSelectCalendarDate = (selectedDate: string) => {
    this.props.actions.setDay(selectedDate);
  };

  getSelectedDateTitle = () => {
    if (!this.state.selectedDates.length) {
      return i18n.anyDay;
    }

    return this.state.selectedDates.map((date: string) =>
      capitalizeFirstLetter(moment(date).calendar(null, {
        sameDay: `[${i18n.days.sameDay}]`,
        nextDay: `[${i18n.days.nextDay}]`,
        lastWeek: '[last] dddd',
        nextWeek: 'dddd',
        sameElse: 'L',
      }))).join(', ');
  }

  onSerpPress = () => {
    if (this.props.hasAddressLocation) {
      trackEvent('hasSearchAddress');
    } else if (this.props.hasUserLocation) {
      trackEvent('availableUserLocation');
    } else {
      trackEvent('notAvailableUserLocation');
    }

    Actions.serp();
  };

  onAddressClearPress = () => {
    this.props.actions.clearAddress();
  };

  render() {
    const {
      categorySelectionFlags,
      general,
      homeDeparture,
      manicureSearchFormSections,
      pedicureSearchFormSections,
      searchQuery,
    } = this.props;

    const { place } = this.props.general;

    const {
      renderContent,
      showShortForm,
      showMasterTypeModal,
      showMasterCalendarModal,
      selectedDates,
    } = this.state;

    if (!renderContent) {
      return null;
    }

    const masterTypeSubtitle = find(general.masterType.items, { active: true }).label;

    return (
      <View style={styles.container}>
        <ScrollView style={styles.content}>
          <FilterLabel text={i18n.search.vacantDays} />
          <FilterTab
            onChange={this.toggleCalendarModal}
            shouldShowSeparator={false}
            title={this.getSelectedDateTitle()}
          />
          <SearchFormCalendar
            containerWidth={170}
            onDateSelect={this.onSelectCalendarDate}
            selectedDates={selectedDates}
            showCalendar={showMasterCalendarModal}
            toggleCalendarModal={this.toggleCalendarModal}
          />
          <FilterLabel text={i18n.search.masterPlace} />
          <FilterTab
            onChange={Actions.searchCity}
            title={i18n.city}
            subtitle={general.cities.selected != null ? general.cities.selected.name : undefined}
          />
          <FilterTab
            controlTitle={i18n.clear}
            onControlPress={this.onAddressClearPress}
            onChange={Actions.searchAddress}
            subtitle={place.label || i18n.location.here}
            title={i18n.search.nearWith}
          />
          <FilterCheckBox
            title={i18n.search.masterToHome}
            active={homeDeparture.active}
            onChange={this.onDepartureToggle}
            withInput={false}
            shouldShowSeparator={false}
          />
          <FilterLabel text={i18n.search.generalInfo} />
          <FilterTab
            title={i18n.filters.masterType.title}
            subtitle={masterTypeSubtitle}
            onChange={this.toggleMasterTypeModal}
            shouldShowSeparator={showShortForm}
          />
          <SearchFormMasterType
            showMasterTypeModal={showMasterTypeModal}
            toggleMasterTypeModal={this.toggleMasterTypeModal}
            masterType={general.masterType}
            onMasterTypeSelect={this.onMasterTypeSelect}
          />
          <StateMachine visible={showShortForm}>
            <View>
              <FilterCheckBox
                title={i18n.manicure}
                active={categorySelectionFlags.manicure}
                onChange={this.onManicureToggle}
                withInput={false}
              />
              <FilterCheckBox
                title={i18n.pedicure}
                active={categorySelectionFlags.pedicure}
                onChange={this.onPedicureToggle}
                withInput={false}
              />
              <FilterCheckBox
                title={i18n.filters.nailExtensionShort}
                active={categorySelectionFlags.extension}
                modelName="extensionShort"
                onChange={this.onExtensionToggle}
                withInput={false}
              />
              <FilterCheckBox
                title={i18n.filters.withdrawal}
                active={categorySelectionFlags.removing}
                onChange={this.onWithdrawalToggle}
                withInput={false}
                shouldShowSeparator={false}
              />
            </View>
          </StateMachine>
          <StateMachine visible={!showShortForm}>
            <SearchFormCategoryBlock
              title={i18n.manicure}
              sections={manicureSearchFormSections}
              onServiceChange={this.onServiceToggle('serviceManicure')}
              onCategoryChange={this.onCategoryToggle('serviceManicure')}
            />
          </StateMachine>
          <StateMachine visible={!showShortForm}>
            <SearchFormCategoryBlock
              title={i18n.pedicure}
              sections={pedicureSearchFormSections}
              onServiceChange={this.onServiceToggle('servicePedicure')}
              onCategoryChange={this.onCategoryToggle('servicePedicure')}
            />
          </StateMachine>
          {false && (<ButtonControl
            label={showShortForm ? i18n.search.full : i18n.search.short}
            customStyles={{ nextButton: styles.extendedSearch, nextText: styles.nextText }}
            onPress={this.toggleForm}
          />)}
        </ScrollView>
        <ButtonControl
          label={i18n.findMaster}
          onPress={this.onSerpPress}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: vars.bodyColor,
    alignItems: 'center',
  },
  content: {
    alignSelf: 'stretch',
    backgroundColor: vars.color.white,
  },
  navBar: {
    height: 40,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    ...Platform.select({
      ios: {
        marginTop: 20,
      },
      android: {
        height: 56,
      },
    }),
  },
  navTitle: {
    color: vars.color.white,
    fontSize: 17,
    ...Platform.select({
      android: {
        fontSize: 20,
      },
    }),
  },
  menu: {
    padding: 0,
    alignItems: 'center',
    left: 16,
  },
  extendedSearch: {
    backgroundColor: vars.color.lightGrey,
    ...Platform.select({
      ios: {
        height: 50,
        borderTopColor: vars.color.cellSeparatorColorIOS,
        borderTopWidth: 1,
      },
    }),
  },
  nextText: {
    color: vars.color.red,
  },
});
