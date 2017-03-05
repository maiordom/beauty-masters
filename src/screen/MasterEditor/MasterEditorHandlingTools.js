import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';

import Label from '../../components/Label';
import Switch from '../../components/Switch';
import ButtonControl from '../../components/ButtonControl';

import i18n from '../../i18n';

export default class MasterEditorHandlingTools extends Component {
  onPressNext = () => {
    Actions.masterEditorCalendar();
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inner}>
          <Label text={i18n.handlingTool} subText={i18n.specifyHowYouSterilizeTools} />
          <Switch title={i18n.handlingToolMethods.ultrasound} />
          <Switch title={i18n.handlingToolMethods.ultraviolet} />
          <Switch title={i18n.handlingToolMethods.glasperlenovySterilizer} />
          <Switch title={i18n.handlingToolMethods.dryHeatMethod} />
          <Switch title={i18n.handlingToolMethods.anotherWay} />
        </View>
        <ButtonControl onPress={this.onPressNext} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  inner: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15
  }
});
