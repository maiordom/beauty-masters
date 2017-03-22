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
    this.props.actions.setFieldParam(modelName, 'value', value, this.props.sectionName);
  };

  onIntervalChange = (value, id, modelName) => {
    this.props.actions.setItemById(modelName, id, this.props.sectionName);
  };

  onChangeTimeEnd = (timeEnd, modelName) => {
    this.props.actions.setFieldParam(modelName, 'timeEnd', timeEnd, this.props.sectionName);
  };

  onChangeTimeStart = (timeStart, modelName) => {
    this.props.actions.setFieldParam(modelName, 'timeStart', timeStart, this.props.sectionName);
  };

  render() {
    const {
      calendarSettings,
      onReadyPress,
    } = this.props;

    const {
      intervalGroup,
      recipientsField,
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
          onChangeTimeStart={this.onChangeTimeStart}
          onChangeTimeEnd={this.onChangeTimeEnd}
          timeStart={recipientsField.timeStart}
          timeEnd={recipientsField.timeEnd}
          modelName={recipientsField.modelName}
        />
        <SubLabel label={i18n.youCanEditTheDaysApart} spacing />
        <Calendar />
        <View style={styles.gap} />
        <ButtonControl label={i18n.ready} onPress={onReadyPress} />
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  gap: {
    height: 36
  }
});
