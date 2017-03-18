import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableHighlight, Platform } from 'react-native';

import Input from '../Input';
import Switch from '../Switch';
import ButtonControl from '../ButtonControl';

export default class MasterEditorGeneral extends Component {
  onChange = (value, modelName) => {
    this.props.actions.setFieldValue(modelName, value, this.props[modelName].sectionName);
  };

  render() {
    const {
      onNextPress,
      firstNameField,
      lastNameField,
      phoneField,
      isSalonField,
      salonNameField,
    } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.inner}>
          <Input {...firstNameField} onChange={this.onChange} />
          <Input {...lastNameField} onChange={this.onChange} />
          <Input {...phoneField} onChange={this.onChange} />
          <Switch {...isSalonField} onChange={this.onChange} />
          <Input {...salonNameField} editable={isSalonField.value} onChange={this.onChange} />
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
