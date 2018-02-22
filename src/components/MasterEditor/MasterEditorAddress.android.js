/* @flow */

import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import upperFirst from 'lodash/upperFirst';

import type { TMasterEditorAddress } from '../../types/MasterEditorAddress';

import { InputWithLabel } from '../Input';
import Label from '../Label';

import i18n from '../../i18n';
import vars from '../../vars';

type TProps = TMasterEditorAddress;

export default class MasterEditorAddress extends PureComponent<TProps, void> {
  onChange = (value: string, modelName: string) => {
    this.props.onChange(upperFirst(value), modelName);
  };

  render() {
    const {
      addressField,
      cityField,
      salonTitleField,
      subwayStationField,
    } = this.props.models;

    const {
      onAddressChange,
      onCityChange,
      onSubwayStationChange,
    } = this.props;

    return (
      <View>
        <Label text={i18n.configureCalendar} subText={i18n.workAddress} spacing />
        <View style={styles.container}>
          <InputWithLabel
            {...salonTitleField}
            debounce
            debounceTimer={200}
            onChange={this.onChange}
            placeholder={i18n.specifyAddressName}
            required
          />
          <TouchableWithoutFeedback onPress={onCityChange}>
            <View style={[styles.label, styles.labelCity]}>
              <Text style={styles.labelText}>{cityField.label}</Text>
              <Text style={styles.labelValue}>{cityField.value || i18n.specify}</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={onAddressChange}>
            <View style={[styles.label, styles.labelAddress]}>
              <Text style={styles.labelText}>
                {addressField.label}
                <Text style={styles.required}> *</Text>
              </Text>
              {addressField.value ? (
                <Text style={styles.labelValue}>{addressField.value}</Text>
              ) : (
                <Text style={styles.labelDefaultValue}>{i18n.specify}</Text>
              )}
            </View>
          </TouchableWithoutFeedback>
          {subwayStationField && (
            <TouchableWithoutFeedback onPress={onSubwayStationChange}>
              <View style={[styles.label]}>
                <Text style={styles.labelText}>{subwayStationField.label}</Text>
                <Text style={styles.labelValue}>{subwayStationField.value || i18n.specify}</Text>
              </View>
            </TouchableWithoutFeedback>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 12,
    paddingRight: 15,
  },
  filter: {
    paddingLeft: 4,
  },
  labelAddress: {
    marginBottom: 16,
  },
  labelCity: {
    marginBottom: 16,
  },
  label: {
    paddingLeft: 4,
  },
  labelText: {
    fontSize: 12,
    color: vars.color.grey,
    marginBottom: 5,
  },
  labelValue: {
    fontSize: 16,
    color: vars.color.black,
  },
  labelDefaultValue: {
    color: vars.color.grey,
  },
  required: {
    color: vars.color.red,
  },
});
