// @flow

import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableHighlight, Platform } from 'react-native';
import upperFirst from 'lodash/upperFirst';
import { toPattern } from 'vanilla-masker';

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

type TState = {
    hasError: boolean;
    errorFillPhoneNumber: boolean;
    validationStatus: null | string;
};

type TProps = {
    actions: object;
    onNextPress: () => void;
    firstNameField: object;
    isSalonField: object;
    lastNameField: object;
    phoneField: object;
    salonNameField: object;
};

export default class MasterEditorGeneral extends Component<void, void, TState> {
  state = {
    hasError: false,
    errorFillPhoneNumber: false,
    validationStatus: null,
  };

  onChange = (value, modelName, toUpperFirst) => {
    value = toUpperFirst ? upperFirst(value) : value;
    this.props.actions.setFieldValue(modelName, value, this.props[modelName].sectionName);
    if (this.state.hasError) {
      this.validate();
    }
  };

  onUserNameChange = (...args) => this.onChange(...args, true);

  formatPhone = (value: string) => {
    let rawValue = value.replace(/[^0-9]+/g, '');

    if (rawValue.length > 1 && rawValue[0] === '7') {
      rawValue = rawValue.slice(1);
    }

    if (value === '7') {
      rawValue = '';
    }

    return toPattern(rawValue, {
      pattern: '+7 (999) 999 99 99'
    });
  };

  onNextPress = () => {
    if (this.validate()) {
      this.props.onNextPress();
    }
  };

  validate() {
    const {
      firstNameField,
      isSalonField,
      lastNameField,
      phoneField,
      salonNameField,
    } = this.props;

    let validation = true;
    let state = {};

    if (!phoneField.value || phoneField.value && phoneField.value.length < 11) {
        validation = false;
        state = { errorFillPhoneNumber: true, hasError: true };
    } else {
        state = { errorFillPhoneNumber: false };
    }

    if (!firstNameField.value
      || !lastNameField.value
      || !phoneField.value
      || isSalonField.value && !salonNameField.value
    ) {
      validation = false;
      state = Object.assign(state, { validationStatus: ALL_FIELDS_REQUIRED });
    } else {
      state = Object.assign(state, { validationStatus: null });
    }

    state.hasError = !validation;

    this.setState(state);

    return validation;
  }

  error = (text) => (
    <View style={styles.error}>
      <Text style={styles.errorText}>{text}</Text>
      <Image style={styles.errorImage} source={icons.warning} />
    </View>
  );

  render() {
    const {
      firstNameField,
      lastNameField,
      phoneField,
      isSalonField,
      salonNameField,
    } = this.props;

    const { validationStatus, hasError, errorFillPhoneNumber } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.inner}>
          <Input
           {...firstNameField}
            debounce
            formatValue={upperFirst}
            onChange={this.onUserNameChange}
          />
          <Input
            {...lastNameField}
            debounce
            formatValue={upperFirst}
            onChange={this.onUserNameChange}
          />
          <Input
            {...phoneField}
            debounce
            formatValue={this.formatPhone}
            keyboardType="phone-pad"
            onChange={this.onChange}
            replaceReg={/(?!^-)[^0-9]/g}
          />
          {errorFillPhoneNumber && (
            this.error(i18n.fillPhoneNumber)
          )}
          <Switch {...isSalonField} onChange={this.onChange} />
          <Input {...salonNameField} debounce editable={isSalonField.value} onChange={this.onChange} />
          {validationStatus === ALL_FIELDS_REQUIRED && (
            this.error(i18n.errors.allFieldsRequired)
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
