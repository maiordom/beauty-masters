import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableHighlight, Platform } from 'react-native';

import Input from '../Input';
import Switch from '../Switch';
import ButtonControl from '../ButtonControl';

import i18n from '../../i18n';
import vars from '../../vars';

const ALL_FIELDS_REQUIRED = 'ALL_FIELDS_REQUIRED';

const icons = Platform.select({
  android: {
    warning: require('../../icons/android/warning.png'),
  },
});

export default class MasterEditorGeneral extends Component {
  state = {
    validationStatus: null,
    hasError: false,
  };

  onChange = (value, modelName) => {
    this.props.actions.setFieldValue(modelName, value, this.props[modelName].sectionName);
    if (this.state.hasError) {
      this.validate();
    }
  };

  onNextPress = () => {
    if (this.validate()) {
      this.props.onNextPress();
    }
  }

  validate() {
    const {
      firstNameField,
      lastNameField,
      phoneField,
      isSalonField,
      salonNameField,
    } = this.props;

    if (!firstNameField.value
      || !lastNameField.value
      || !phoneField.value
      || isSalonField.value && !salonNameField.value
    ) {
      this.setState({ validationStatus: ALL_FIELDS_REQUIRED, hasError: true });
      return false;
    }

    this.setState({ validationStatus: null, hasError: false });
    return true;
  }

  render() {
    const {
      firstNameField,
      lastNameField,
      phoneField,
      isSalonField,
      salonNameField,
    } = this.props;

    const { validationStatus, hasError } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.inner}>
          <Input {...firstNameField} debounce onChange={this.onChange} />
          <Input {...lastNameField} debounce onChange={this.onChange} />
          <Input {...phoneField} debounce onChange={this.onChange} />
          <Switch {...isSalonField} onChange={this.onChange} />
          <Input {...salonNameField} debounce editable={isSalonField.value} onChange={this.onChange} />
          {validationStatus === ALL_FIELDS_REQUIRED && (
            <View style={styles.error}>
              <Text style={styles.errorText}>{i18n.errors.allFieldsRequired}</Text>
              <Image source={icons.warning} />
            </View>
          )}
        </View>
        <ButtonControl
          type={hasError && 'disabled'}
          onPress={this.onNextPress}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
    paddingLeft: 12,
    paddingRight: 12,
  },
  error: {
    paddingLeft: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  errorText: {
    color: vars.color.red,
  },
});
