// @flow

import React, { Component } from 'react';
import { View, StyleSheet, Platform, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import find from 'lodash/find';
import moment from 'moment';

import type { ServiceToggleType, MasterTypeSelectType, SelectCalendarDateType } from './SearchFormTypes';

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
    actions: Object,
    serviceManicure: Object,
    servicePedicure: Object,
    general: Object,
    searchQuery: Object
  };

  state = {
    selectedDate: this.props.searchQuery.schedule[0],
    showShortForm: true,
    showMasterCalendarModal: false,
    showMasterTypeModal: false
  };

  toggleForm = () => {
    this.setState({ showShortForm: !this.state.showShortForm });
  };

  onServiceToggle: ServiceToggleType = sectionName =>
    (value, modelName) => {
      this.props.actions.toogleService(modelName, 'active', value, sectionName);
    };

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

  getSelectedDateTitle = () =>
    capitalizeFirstLetter(
      moment(this.state.selectedDate).calendar(null, {
        sameDay: `[${i18n.days.sameDay}]`,
        nextDay: `[${i18n.days.nextDay}]`,
        lastWeek: '[last] dddd',
        nextWeek: 'dddd',
        sameElse: 'L'
      })
    );

  render() {
    const { serviceManicure, servicePedicure, general } = this.props;
    const {
      showShortForm,
      showMasterTypeModal,
      showMasterCalendarModal,
      selectedDate
    } = this.state;

    // {/*<View style={styles.navBar}>*/}
    //     {/*<TouchableHighlight*/}
    //       {/*style={styles.close}*/}
    //       {/*onPress={Actions.pop}*/}
    //       {/*activeOpacity={1}*/}
    //       {/*underlayColor="transparent"*/}
    //     {/*>*/}
    //         {/*<Image style={styles.menu} source={require('../../icons/menu.png')} />*/}
    //     {/*</TouchableHighlight>*/}
    //     {/*<Text style={styles.navTitle}>{i18n.search.searchParams}</Text>*/}
    // {/*</View>*/}
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
          <FilterTab title="Город" subtitle="Москва" onChange={() => {}} />
          <FilterTab
            onChange={Actions.masterLocation}
            title={i18n.search.nearWith}
            subtitle="Мое текущее месторасположение"
          />
          <FilterCheckBox title={i18n.search.masterToHome} />

          <FilterLabel text={i18n.search.generalInfo} />
          <FilterTab
            title={i18n.filters.masterType.title}
            subtitle={find(general.masterType.items, { active: true }).label}
            onChange={this.toggleMasterTypeModal}
          />
          <SearchFormMasterType
            showMasterTypeModal={showMasterTypeModal}
            toggleMasterTypeModal={this.toggleMasterTypeModal}
            masterType={general.masterType}
            onMasterTypeSelect={this.onMasterTypeSelect}
          />

          {showShortForm &&
            <View>
              <FilterCheckBox
                {...serviceManicure.manicure}
                onChange={this.onServiceToggle('serviceManicure')}
                withInput={false}
              />
              <FilterCheckBox
                {...servicePedicure.pedicure}
                onChange={this.onServiceToggle('servicePedicure')}
                withInput={false}
              />
              <FilterCheckBox title={i18n.filters.nailExtensionShort} />
              <FilterCheckBox title={i18n.filters.withdrawal} />
            </View>}

          {!showShortForm &&
            <SearchFormBlockManicure service={serviceManicure} onChange={this.onServiceToggle('serviceManicure')} />}

          {!showShortForm &&
            <SearchFormBlockPedicure service={servicePedicure} onChange={this.onServiceToggle('servicePedicure')} />}

          <ButtonControl
            label={showShortForm ? i18n.search.full : i18n.search.short}
            customStyles={{
              nextButton: {
                backgroundColor: vars.color.lightGrey
              },
              nextText: {
                color: vars.color.red
              }
            }}
            onPress={this.toggleForm}
          />
          <ButtonControl label={i18n.findMaster} onPress={() => {}} />
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: vars.bodyColor,
    alignItems: 'center'
  },
  content: {
    alignSelf: 'stretch',
    backgroundColor: vars.color.white
  },
  navBar: {
    height: 40,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    ...Platform.select({
      ios: {
        marginTop: 20
      },
      android: {
        height: 56
      }
    })
  },
  navTitle: {
    color: vars.color.white,
    fontSize: 17,
    ...Platform.select({
      android: {
        fontSize: 20
      }
    })
  },
  menu: {
    padding: 0,
    alignItems: 'center',
    left: 16
  }
});
