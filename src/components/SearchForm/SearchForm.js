// @flow

import React, { Component } from 'react';
import { View, StyleSheet, Platform, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import find from 'lodash/find';
import filter from 'lodash/filter';
import every from 'lodash/every';
import moment from 'moment';
import 'moment/locale/ru';

import SearchFormCalendar from './SearchFormCalendar';
import SearchFormMasterType from './SearchFormMasterType';
import SearchFormBlockManicure from './SearchFormBlockManicure';
import SearchFormBlockPedicure from './SearchFormBlockPedicure';

import StateMachine from '../../components/StateMachine';
import { FilterLabel } from '../../components/FilterLabel';
import FilterTab from '../../components/Filter';
import FilterCheckBox from '../../components/FilterCheckBox';
import ButtonControl from '../../components/ButtonControl';

import vars from '../../vars';
import i18n from '../../i18n';
import { capitalizeFirstLetter } from '../../utils';

type TProps = {
  actions: {
    toggleService: Function,
    toggleDeparture: Function,
    setItemById: Function,
    setDay: Function,
    toggleExtension: Function,
    toggleWithdrawal: Function,
    toggleManicure: Function,
    togglePedicure: Function,
  },
  serviceManicure: Object,
  servicePedicure: Object,
  general: Object,
  searchQuery: Object,
};

type TState = {
  selectedDate: string,
  showMasterCalendarModal: boolean,
  showMasterTypeModal: boolean,
  showShortForm: boolean,
};

export default class SearchFormShort extends Component<TProps, TState> {
  state = {
    selectedDate: this.props.searchQuery.dates[0],
    showShortForm: true,
    showMasterCalendarModal: false,
    showMasterTypeModal: false,
  };

  toggleForm = () => {
    this.setState({ showShortForm: !this.state.showShortForm });
  };

  onServiceToggle = (sectionName: string) => (value: boolean, modelName: string) => {
    this.props.actions.toggleService(modelName, 'active', value, sectionName);
  };

  onCategoryToggle = (sectionName) => (value, modelName) => {
  };

  onExtensionToggle = (value: boolean) => this.props.actions.toggleExtension(value);
  onWithdrawalToggle = (value: boolean) => this.props.actions.toggleWithdrawal(value);
  onManicureToggle = (value: boolean) => this.props.actions.toggleManicure(value);
  onPedicureToggle = (value: boolean) => this.props.actions.togglePedicure(value);

  onDepartureToggle = () => this.props.actions.toggleDeparture();

  toggleMasterTypeModal = () => this.setState({ showMasterTypeModal: !this.state.showMasterTypeModal });

  toggleCalendarModal = () => this.setState({ showMasterCalendarModal: !this.state.showMasterCalendarModal });

  onMasterTypeSelect = (value: string, id: number, modelName: string) => {
    this.props.actions.setItemById(modelName, id, 'general');
    this.toggleMasterTypeModal();
  };

  onSelectCalendarDate = (selectedDate: string) => {
    this.setState({ selectedDate });
    this.props.actions.setDay(selectedDate);
    this.toggleCalendarModal();
  };

  getSelectedDateTitle = () => capitalizeFirstLetter(
    moment(this.state.selectedDate).calendar(null, {
      sameDay: `[${i18n.days.sameDay}]`,
      nextDay: `[${i18n.days.nextDay}]`,
      lastWeek: '[last] dddd',
      nextWeek: 'dddd',
      sameElse: 'L',
    }),
  );

  render() {
    const {
      general,
      searchQuery,
      serviceManicure,
      servicePedicure,
    } = this.props;

    const { place } = this.props.general;

    const {
      showShortForm,
      showMasterTypeModal,
      showMasterCalendarModal,
      selectedDate,
    } = this.state;

    const masterTypeSubtitle = find(general.masterType.items, { active: true }).label;

    const isManicureActive = every(filter(
      serviceManicure, service => service.categoryKey === 'manicure',
    ), { active: true });

    const isPedicureActive = every(filter(
      servicePedicure, service => service.categoryKey === 'pedicure',
    ), { active: true });

    const isExtensionActive = every(filter(
      { ...servicePedicure, ...serviceManicure },
      service => service.categoryKey === 'extension',
    ), { active: true });

    const isWithdrawalActive = every(filter(
      { ...servicePedicure, ...serviceManicure },
      service => service.categoryKey === 'removing',
    ), { active: true });

    return (
      <View style={styles.container}>
        <ScrollView style={styles.content}>
          <FilterLabel text={i18n.search.vacantDays} />
          <FilterTab
            title={this.getSelectedDateTitle()}
            onChange={this.toggleCalendarModal}
            shouldShowSeparator={false}
          />
          <SearchFormCalendar
            showCalendar={showMasterCalendarModal}
            selectedDate={selectedDate}
            onDateSelect={this.onSelectCalendarDate}
            toggleCalendarModal={this.toggleCalendarModal}
            containerWidth={170}
          />
          <FilterLabel text={i18n.search.masterPlace} />
          <FilterTab
            onChange={Actions.searchCity}
            title={i18n.city}
            subtitle={general.cities.selected.label}
          />
          <FilterTab
            onChange={Actions.searchAddress}
            title={i18n.search.nearWith}
            subtitle={place.label || i18n.location.here}
          />
          <FilterCheckBox
            title={i18n.search.masterToHome}
            active={searchQuery.isDeparture}
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
                {...serviceManicure.manicure}
                active={isManicureActive}
                onChange={this.onManicureToggle}
                withInput={false}
              />
              <FilterCheckBox
                {...servicePedicure.pedicure}
                active={isPedicureActive}
                onChange={this.onPedicureToggle}
                withInput={false}
              />
              <FilterCheckBox
                title={i18n.filters.nailExtensionShort}
                active={isExtensionActive}
                modelName="extensionShort"
                onChange={this.onExtensionToggle}
                withInput={false}
              />
              <FilterCheckBox
                title={i18n.filters.withdrawal}
                active={isWithdrawalActive}
                onChange={this.onWithdrawalToggle}
                withInput={false}
                shouldShowSeparator={false}
              />
            </View>
          </StateMachine>
          <StateMachine visible={!showShortForm}>
            <SearchFormBlockManicure
              service={serviceManicure}
              onServiceChange={this.onServiceToggle('serviceManicure')}
              onCategoryChange={this.onCategoryToggle('serviceManicure')}
            />
          </StateMachine>
          <StateMachine visible={!showShortForm}>
            <SearchFormBlockPedicure
              service={servicePedicure}
              onServiceChange={this.onServiceToggle('servicePedicure')}
              onCategoryChange={this.onCategoryToggle('servicePedicure')}
            />
          </StateMachine>
          <ButtonControl
            label={showShortForm ? i18n.search.full : i18n.search.short}
            customStyles={{ nextButton: styles.nextButton, nextText: styles.nextText }}
            onPress={this.toggleForm}
          />
          <ButtonControl label={i18n.findMaster} onPress={Actions.serp} />
        </ScrollView>
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
  nextButton: {
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
