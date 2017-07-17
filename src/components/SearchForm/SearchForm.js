// @flow

import React, { Component } from 'react';
import { View, StyleSheet, Platform, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import find from 'lodash/find';
import filter from 'lodash/filter';
import every from 'lodash/every';
import moment from 'moment';
import 'moment/locale/ru';

import type {
  ServiceToggleType,
  MasterTypeSelectType,
  SelectCalendarDateType,
} from '../../types/SearchFormTypes';

import SearchFormCalendar from './SearchFormCalendar';
import SearchFormMasterType from './SearchFormMasterType';
import SearchFormBlockManicure from './SearchFormBlockManicure';
import SearchFormBlockPedicure from './SearchFormBlockPedicure';

import { FilterLabel } from '../../components/FilterLabel';
import FilterTab from '../../components/Filter';
import FilterCheckBox from '../../components/FilterCheckBox';
import ButtonControl from '../../components/ButtonControl';

import vars from '../../vars';
import i18n from '../../i18n';
import { capitalizeFirstLetter } from '../../utils';

export default class SearchFormShort extends Component {
  props: {
    actions: {
      toogleService: Function,
      toggleDeparture: Function,
      setItemById: Function,
      setDay: Function,
      toggleExtension: Function,
      toggleWithdrawal: Function
    },
    serviceManicure: Object,
    servicePedicure: Object,
    general: Object,
    searchQuery: Object
  };

  state = {
    selectedDate: this.props.searchQuery.schedule[0],
    showShortForm: true,
    showMasterCalendarModal: false,
    showMasterTypeModal: false,
  };

  toggleForm = () => {
    this.setState({ showShortForm: !this.state.showShortForm });
  };

  onServiceToggle: ServiceToggleType = (sectionName) => (value, modelName) => {
    this.props.actions.toogleService(modelName, 'active', value, sectionName);
  };

  onExtensionToggle = (value: boolean) => {
    this.props.actions.toggleExtension(value);
  };

  onWithdrawalToggle = (value: boolean) => {
    this.props.actions.toggleWithdrawal(value);
  };

  onDepartureToggle = () => this.props.actions.toggleDeparture();

  toggleMasterTypeModal = () => this.setState({ showMasterTypeModal: !this.state.showMasterTypeModal });

  toggleCalendarModal = () => this.setState({ showMasterCalendarModal: !this.state.showMasterCalendarModal });

  onMasterTypeSelect: MasterTypeSelectType = (value, id, modelName) => {
    this.props.actions.setItemById(modelName, id, 'general');
    this.toggleMasterTypeModal();
  };

  onSelectCalendarDate: SelectCalendarDateType = selectedDate => {
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
      serviceManicure,
      servicePedicure,
      general,
      searchQuery,
    } = this.props;

    const {
      showShortForm,
      showMasterTypeModal,
      showMasterCalendarModal,
      selectedDate,
    } = this.state;

    const masterTypeSubtitle = find(general.masterType.items, { active: true }).label;

    const isManicureActive = every(filter(
      serviceManicure, service => service.parentServiceId === 1,
    ), { active: true });

    const isPedicureActive = every(filter(
      servicePedicure, service => service.parentServiceId === 33,
    ), { active: true });

    const isExtensionActive = every(filter(
      { ...servicePedicure, ...serviceManicure },
      service => service.parentServiceId === 1001 && [22, 54].includes(service.id),
    ), { active: true });

    const isWithdrawalActive = every(filter(
      { ...servicePedicure, ...serviceManicure },
      service => service.parentServiceId === 1002,
    ), { active: true });

    return (
      <View style={styles.container}>
        <ScrollView style={styles.content}>
          <FilterLabel text={i18n.search.vacantDays} />
          <FilterTab title={this.getSelectedDateTitle()} onChange={this.toggleCalendarModal} />
          <SearchFormCalendar
            showCalendar={showMasterCalendarModal}
            selectedDate={selectedDate}
            onDateSelect={this.onSelectCalendarDate}
            containerWidth={170}
          />

          {/* Где принимает мастер */}
          <FilterLabel text={i18n.search.masterPlace} />
          <FilterTab
            onChange={Actions.searchCity}
            title={i18n.city}
            subtitle={general.cities.selected.label}
          />
          <FilterTab
            onChange={Actions.searchAddress}
            title={i18n.search.nearWith}
            subtitle={i18n.location.here}
          />
          <FilterCheckBox
            title={i18n.search.masterToHome}
            active={searchQuery.isDeparture}
            onChange={this.onDepartureToggle}
            withInput={false}
          />
          <FilterLabel text={i18n.search.generalInfo} />
          <FilterTab
            title={i18n.filters.masterType.title}
            subtitle={masterTypeSubtitle}
            onChange={this.toggleMasterTypeModal}
          />
          <SearchFormMasterType
            showMasterTypeModal={showMasterTypeModal}
            toggleMasterTypeModal={this.toggleMasterTypeModal}
            masterType={general.masterType}
            onMasterTypeSelect={this.onMasterTypeSelect}
          />
          <View style={!showShortForm && styles.hidden}>
            <FilterCheckBox
              {...serviceManicure.manicure}
              active={isManicureActive}
              onChange={this.onServiceToggle('serviceManicure')}
              withInput={false}
            />
            <FilterCheckBox
              {...servicePedicure.pedicure}
              active={isPedicureActive}
              onChange={this.onServiceToggle('servicePedicure')}
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
            />
          </View>
          <View style={showShortForm && styles.hidden}>
            <SearchFormBlockManicure
              service={serviceManicure}
              onChange={this.onServiceToggle('serviceManicure')}
            />
          </View>
          <View style={showShortForm && styles.hidden}>
            <SearchFormBlockPedicure
              service={servicePedicure}
              onChange={this.onServiceToggle('servicePedicure')}
            />
          </View>
          <ButtonControl
            label={showShortForm ? i18n.search.full : i18n.search.short}
            customStyles={{ nextButton: styles.nextButton, nextText: styles.nextText }}
            onPress={this.toggleForm}
          />
          <ButtonControl label={i18n.findMaster} onPress={Actions.Serp} />
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
  },
  nextText: {
    color: vars.color.red,
  },
  hidden: {
    position: 'absolute',
    width: 0,
    height: 0,
  },
});
