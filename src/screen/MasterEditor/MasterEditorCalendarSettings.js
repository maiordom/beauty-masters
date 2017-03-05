import React, { Component } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import ButtonControl from '../../components/ButtonControl';
import Label from '../../components/Label';
import SelectSchedule from '../../containers/SelectSchedule';
import RangeTime from '../../components/RangeTime';
import MasterEditorAddress from '../../components/MasterEditorAddress';
import { SubLabel } from '../../components/SubLabel';
import Calendar from '../../components/Calendar';

import i18n from '../../i18n';

class MasterEditorCalendarSettings extends Component {
  onReadyPress = () => {
    Actions.masterEditorCalendar();
  };

  render() {
    return (
      <ScrollView>
        <Label text={i18n.configureCalendar} subText={i18n.workAddress} spacing />
        <MasterEditorAddress />
        <Label text={i18n.youtSchedule} subText={i18n.selectYoutSchedule} spacing />
        <SelectSchedule />
        <RangeTime />
        <SubLabel label={i18n.youCanEditTheDaysApart} spacing />
        <Calendar />
        <View style={styles.gap} />
        <ButtonControl label={i18n.ready} onPress={this.onReadyPress} />
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  gap: {
    height: 36
  }
});

export default connect(null)(MasterEditorCalendarSettings);
