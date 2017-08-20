// @flow

import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableHighlight, Platform } from 'react-native';
import { toPattern } from 'vanilla-masker';
import upperFirst from 'lodash/upperFirst';

import Input from '../Input';
import Switch from '../Switch';
import ButtonControl from '../ButtonControl';
import ActivityIndicator from '../../containers/ActivityIndicator';

import i18n from '../../i18n';
import vars from '../../vars';

const ALL_FIELDS_REQUIRED = 'ALL_FIELDS_REQUIRED';

const icons = Platform.select({
  android: {
    warning: require('../../icons/android/warning.png'),
  },
});

type TState = {
    errorFillPhoneNumber: boolean;
    errorFillSalonName: boolean;
    errorFillUsername: boolean;
    hasError: boolean;
};

type TProps = {
    actions: Object;
    isSalonField: Object;
    next: () => void;
    phoneField: Object;
    salonNameField: Object;
    usernameField: Object;
};

export default class MasterEditorGeneral extends Component<void, TProps, TState> {
  state = {
    errorFillPhoneNumber: false,
    errorFillSalonName: false,
    errorFillUsername: false,
    hasError: false,
  };

  onChange = (value: string, modelName: string) => {
    const sectionName = this.props[modelName].sectionName

    this.props.actions.setFieldValue(modelName, value, sectionName);

    if (this.state.hasError) {
      this.validate();
    }
  };

  onUsernameBlur = (value: string, modelName: string) => {
    const sectionName = this.props[modelName].sectionName;

    this.props.actions.setFieldValue(modelName, upperFirst(value), sectionName);
  };

  onPhoneChange = (value: string, modelName: string) => {
    const sectionName = this.props[modelName].sectionName;

    value = value.replace(/[^0-9]+/g, '');

    this.props.actions.setFieldValue(modelName, upperFirst(value), sectionName);
  };

  formatPhone = (value: string) => {
    let rawValue = value.replace(/[^0-9]+/g, '');

    if (rawValue.length > 1 && rawValue[0] === '7') {
      rawValue = rawValue.slice(1);
    }

    if (value === '+7 (') {
      rawValue = '';
    }

    return toPattern(rawValue, {
      pattern: '+7 (999) 999 99 99'
    });
  };

  onNextPress = () => {
    if (this.validate()) {
      this.props.actions.createMaster().then((res) => {
        if (res.result === 'success') {
          this.props.next();
        }
      });
    }
  };

  validate() {
    const {
      usernameField,
      isSalonField,
      phoneField,
      salonNameField,
    } = this.props;

    let validation = true;
    let state = {};

    if (!phoneField.value || phoneField.value && phoneField.value.length < 11) {
        validation = false;
        state.errorFillPhoneNumber = true;
    } else {
        state.errorFillPhoneNumber = false;
    }

    state.errorFillUsername = !usernameField.value;
    state.errorFillSalonName = isSalonField.value && !salonNameField.value;

    if (!usernameField.value
      || !phoneField.value
      || isSalonField.value && !salonNameField.value
    ) {
      validation = false;
    }

    state.hasError = !validation;

    this.setState(state);

    return validation;
  }

  error = (text: string) => (
    <View style={styles.error}>
      <Text style={styles.errorText}>{text}</Text>
      <Image style={styles.errorImage} source={icons.warning} />
    </View>
  );

  render() {
    const {
      isSalonField,
      phoneField,
      salonNameField,
      usernameField,
    } = this.props;

    const {
      errorFillPhoneNumber,
      errorFillSalonName,
      errorFillUsername,
      hasError,
    } = this.state;

    return (
      <View style={styles.container}>
        <ActivityIndicator position="absolute" />
        <View style={styles.inner}>
          <Input
            {...usernameField}
            debounce
            onBlur={this.onUsernameBlur}
            onChange={this.onChange}
          />
          {errorFillUsername && (
            this.error(i18n.fillField)
          )}
          <Input
            {...phoneField}
            debounce
            formatValue={this.formatPhone}
            keyboardType="phone-pad"
            onChange={this.onPhoneChange}
          />
          {errorFillPhoneNumber && (
            this.error(i18n.fillPhoneNumber)
          )}
          <Switch {...isSalonField} onChange={this.onChange} />
          <Input {...salonNameField} debounce editable={isSalonField.value} onChange={this.onChange} />
          {errorFillSalonName && (
            this.error(i18n.fillField)
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
  },
  errorText: {
    color: vars.color.red,
    marginRight: 10,
  },
  errorImage: {
    marginTop: 3,
  },
});
