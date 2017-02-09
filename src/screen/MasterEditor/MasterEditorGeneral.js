import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableHighlight, Platform } from 'react-native';
import { Actions } from 'react-native-router-flux';

import Input from '../../components/Input';
import Switch from '../../components/Switch';
import ButtonNext from '../../components/ButtonNext';

import i18n from '../../i18n';

export default class MasterEditorGeneral extends Component {
  onNextPress = () => {
    Actions.masterEditorService();
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inner}>
          <Input placeholder={i18n.firstName} />
          <Input placeholder={i18n.lastName} />
          <Input placeholder={i18n.phone} />
          <Switch title={i18n.salonMaster} />
          <Input placeholder={i18n.salonName} />
        </View>
        <ButtonNext onPress={this.onNextPress} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  inner: {
    paddingLeft: 15,
    paddingRight: 15
  }
});

