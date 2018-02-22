/* @flow */

import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';

import MasterEditorSectionTitle from './MasterEditorSectionTitle';
import PickerList from '../PickerList.ios';
import RangeTime from '../RangeTime';

import i18n from '../../i18n';
import vars from '../../vars';

import type { TMasterEditorSchedule } from '../../types/MasterEditorSchedule';

type TProps = TMasterEditorSchedule;

export default class MasterEditorSchedule extends PureComponent<TProps, void> {
  render() {
    const {
      timeStartField,
      timeEndField,
      intervalGroup,
      onIntervalChange,
      onTimeStartChange,
      onTimeEndChange,
    } = this.props;

    return (
      <View>
        <MasterEditorSectionTitle title={i18n.selectYourSchedule} />
        <View style={styles.container}>
          <PickerList {...intervalGroup} onChange={onIntervalChange} />
        </View>
        <RangeTime
          onTimeStartChange={onTimeStartChange}
          onTimeEndChange={onTimeEndChange}
          timeStart={timeStartField.value}
          timeEnd={timeEndField.value}
          timeStartModelName={timeStartField.modelName}
          timeEndModelName={timeEndField.modelName}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: vars.color.cellSeparatorColorIOS,
    borderBottomColor: vars.color.cellSeparatorColorIOS,
  },
});
