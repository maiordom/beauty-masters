import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';

import Label from '../../components/Label';
import Switch from '../../components/Switch';
import ButtonNext from '../../components/ButtonNext';

import i18n from '../../i18n';

export default class MasterEditorHandlingTools extends Component {
  onPressNext = () => {
    Actions.masterEditorCalendar();
  };

  render() {
    return (
      <View style={styles.container}>
        <Label text={i18n.handlingTool} subText={i18n.specifyHowYouSterilizeTools} />
        <View style={styles.inner}>
          <Switch title={i18n.handlingToolMethods.ultrasound} />
          <Switch title={i18n.handlingToolMethods.ultraviolet} />
          <Switch title={i18n.handlingToolMethods.glasperlenovySterilizer} />
          <Switch title={i18n.handlingToolMethods.dryHeatMethod} />
          <Switch title={i18n.handlingToolMethods.anotherWay} />
        </View>
        <ButtonNext onPress={this.onPressNext} />
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
