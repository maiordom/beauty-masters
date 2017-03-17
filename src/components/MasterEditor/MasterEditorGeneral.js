import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableHighlight, Platform } from 'react-native';

import Input from '../Input';
import Switch from '../Switch';
import ButtonControl from '../ButtonControl';

export default class MasterEditorGeneral extends Component {
  onChange = (modelName, value) => {
    this.props.actions.setFieldValue(modelName, value, this.props[modelName].sectionName);
  };

  render() {
    const {
      onNextPress,
      firstName,
      lastName,
      phone,
      isSalon,
      salonName,
    } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.inner}>
          <Input {...firstName} onChange={this.onChange} />
          <Input {...lastName} onChange={this.onChange} />
          <Input {...phone} onChange={this.onChange} />
          <Switch {...isSalon} onChange={this.onChange} />
          <Input {...salonName} editable={isSalon.value} onChange={this.onChange} />
        </View>
        <ButtonControl onPress={onNextPress} />
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
    paddingLeft: 16,
    paddingRight: 16
  }
});
