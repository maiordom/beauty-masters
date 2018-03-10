/* @flow */

import React, { PureComponent } from 'react';
import { View } from 'react-native';

import Label from '../../Label';
import RadioGroup from '../../RadioGroup';
import RangeTime from '../../RangeTime';

import i18n from '../../../i18n';

import type { TMasterEditorSchedule } from './MasterEditorSchedule.types';

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
        <Label text={i18n.yourSchedule} subText={i18n.selectYourSchedule} spacing />
        <RadioGroup {...intervalGroup} onChange={onIntervalChange} />
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
