// @flow

import React, { Component } from 'react';
import {
  InteractionManager,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

import { SubLabel } from '../SubLabel';
import ActivityIndicator from '../../containers/ActivityIndicator';
import ButtonControl from '../ButtonControl';
import Calendar from '../Calendar';
import Label from '../Label';
import MasterEditorAddress from '../MasterEditor/MasterEditorAddress';
import RadioGroup from '../RadioGroup';
import RangeTime from '../RangeTime';

import i18n from '../../i18n';

type TProps = {
  actions: Object,
  calendarSettings: Object,
  sectionName: string,
};

type TState = {
  automate: string[],
  show: Object,
};

export default class MasterEditorCalendarSettings extends Component<TProps, TState> {
  state = {
    automate: [
      'address',
      'schedule',
      'calendar',
    ],
    show: {},
  };

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => this.iterate());
  }

  iterate = () => {
    if (!this.state.automate.length) {
      return;
    }

    const sectionName = this.state.automate[0];

    this.setState({
      automate: this.state.automate.slice(1),
      show: Object.assign(this.state.show, { [sectionName]: true }),
    });

    setTimeout(() => this.iterate(), 20);
  };

  onAddressFieldChange = (value: string, modelName: string) => {
    this.props.actions.setAddressField(modelName, 'value', value, this.props.sectionName);
  }

  onIntervalChange = (value: string, id: number, modelName: string) => {
    this.props.actions.setCalendarInterval(modelName, id, this.props.sectionName);
    this.props.actions.drawerOpen({
      contentKey: 'IntervalStartDate',
      sectionName: this.props.sectionName,
    });
  };

  onTimeEndChange = (timeEnd: string, modelName: string) => {
    this.props.actions.setTimeTableField(modelName, 'value', timeEnd, this.props.sectionName);
    this.props.actions.setCustomDatesField('customDates', 'timeEndDefault', timeEnd, this.props.sectionName);
  };

  onTimeStartChange = (timeStart: string, modelName: string) => {
    this.props.actions.setTimeTableField(modelName, 'value', timeStart, this.props.sectionName);
    this.props.actions.setCustomDatesField('customDates', 'timeStartDefault', timeStart, this.props.sectionName);
  };

  onDateSelect = (date: string, hasEvent: boolean) => {
    this.props.actions.drawerOpen({
      contentKey: 'WorkTimeSpecification',
      date,
      hasEvent,
      sectionName: this.props.sectionName,
    });
  };

  onReadyPress = () => {
    this.props.actions.next();
  };

  onAddressChange = () => {
    this.props.actions.selectAddress(this.props.sectionName);
  };

  render() {
    const { calendarSettings } = this.props;
    const { show } = this.state;
    const {
      intervalGroup,
      timeStartField,
      timeEndField,
      startDateField,
      customDates,
    } = calendarSettings;

    const addressModels = {
      addressField: calendarSettings.addressField,
      cityField: calendarSettings.cityField,
      salonTitleField: calendarSettings.salonTitleField,
      subwayStationField: calendarSettings.subwayStationField,
    };

    return (
      <View style={styles.container}>
        <ActivityIndicator position="absolute" />
        <ScrollView style={styles.inner}>
          {show.address && (
            <View>
              <Label text={i18n.configureCalendar} subText={i18n.workAddress} spacing />
              <MasterEditorAddress
                models={addressModels}
                onAddressChange={this.onAddressChange}
                onChange={this.onAddressFieldChange}
              />
            </View>
          )}
          {show.schedule && (
            <View>
              <Label text={i18n.yourSchedule} subText={i18n.selectYoutSchedule} spacing />
              <RadioGroup {...intervalGroup} onChange={this.onIntervalChange} />
              <RangeTime
                onTimeStartChange={this.onTimeStartChange}
                onTimeEndChange={this.onTimeEndChange}
                timeStart={timeStartField.value}
                timeEnd={timeEndField.value}
                timeStartModelName={timeStartField.modelName}
                timeEndModelName={timeEndField.modelName}
              />
            </View>
          )}
          {show.calendar && (
            <View>
              <SubLabel label={i18n.youCanEditTheDaysApart} spacing />
              <Calendar
                disableSelectDate
                events={customDates.items}
                eventTimeEndDefault={customDates.timeEndDefault}
                eventTimeStartDefault={customDates.timeStartDefault}
                interval={intervalGroup.selected}
                onDateSelect={this.onDateSelect}
                startDate={startDateField.value}
              />
            </View>
          )}
        </ScrollView>
        <ButtonControl label={i18n.ready} onPress={this.onReadyPress} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
  },
});
