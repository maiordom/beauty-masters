import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

import RadioGroup from '../RadioGroup';
import ButtonControl from '../ButtonControl';
import Label from '../Label';
import RangeTime from '../RangeTime';
import MasterEditorAddress from '../MasterEditor/MasterEditorAddress';
import { SubLabel } from '../SubLabel';
import Calendar from '../Calendar';

import i18n from '../../i18n';

export default class MasterEditorCalendarSettings extends Component {
  onChange = (value, modelName) => {
    this.props.actions.setCalendarField(modelName, 'value', value, this.props.sectionName);
  };

  onIntervalChange = (value, id, modelName) => {
    this.props.actions.setCalendarInterval(modelName, id, this.props.sectionName);
    this.props.drawerOpen({
      contentKey: 'IntervalStartDate',
      sectionName: this.props.sectionName,
    });
  };

  onTimeEndChange = (timeEnd, modelName) => {
    this.props.actions.setCalendarField(modelName, 'value', timeEnd, this.props.sectionName);
  };

  onTimeStartChange = (timeStart, modelName) => {
    this.props.actions.setCalendarField(modelName, 'value', timeStart, this.props.sectionName);
  };

  onDateSelect = date => {
    this.props.drawerOpen({
      date,
      contentKey: 'WorkTimeSpecification',
      sectionName: this.props.sectionName,
    });
  };

  render() {
    const {
      calendarSettings,
      onReadyPress,
    } = this.props;

    const {
      intervalGroup,
      timeStartField,
      timeEndField,
      startDateField,
      customDates,
    } = calendarSettings;

    const addressModels = {
      salonTitleField: calendarSettings.salonTitleField,
      cityField: calendarSettings.cityField,
      streetField: calendarSettings.streetField,
      districtField: calendarSettings.districtField,
      subwayStationField: calendarSettings.subwayStationField,
      houseField: calendarSettings.houseField,
      buildingField: calendarSettings.buildingField,
    };

    return (
      <ScrollView>
        <Label text={i18n.configureCalendar} subText={i18n.workAddress} spacing />
        <MasterEditorAddress {...addressModels} onChange={this.onChange} />
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
        <SubLabel label={i18n.youCanEditTheDaysApart} spacing />
        <Calendar
          disableSelectDate
          events={customDates.items}
          interval={intervalGroup.selected}
          onDateSelect={this.onDateSelect}
          startDate={startDateField.value}
        />
        <View style={styles.gap} />
        <ButtonControl label={i18n.ready} onPress={onReadyPress} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  gap: {
    height: 36,
  },
});
