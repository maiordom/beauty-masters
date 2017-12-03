/* @flow */

import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import upperFirst from 'lodash/upperFirst';

import InputWithLabel from '../InputWithLabel';

import i18n from '../../i18n';
import vars from '../../vars';

type TProps = {
  models: Object,
  onAddressChange: () => void,
  onChange: (value: string, modelName: string) => void,
};

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

    const { onAddressChange } = this.props;

    return (
      <View style={styles.container}>
        <InputWithLabel
          {...salonTitleField}
          debounce
          debounceTimer={200}
          onChange={this.onChange}
          placeholder={i18n.specify}
        />
        <TouchableWithoutFeedback>
          <View style={[styles.label, styles.labelCity]}>
            <Text style={styles.labelText}>{cityField.label}</Text>
            <Text style={styles.labelValue}>{cityField.value || i18n.specify}</Text>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={onAddressChange}>
          <View style={[styles.label, styles.labelAddress]}>
            <Text style={styles.labelText}>{addressField.label}</Text>
            {addressField.value ? (
              <Text style={styles.labelValue}>{addressField.value}</Text>
            ) : (
              <Text style={styles.labelDefaultValue}>{i18n.specify}</Text>
            )}
          </View>
        </TouchableWithoutFeedback>
        <InputWithLabel
          {...subwayStationField}
          debounce
          debounceTimer={200}
          onChange={this.onChange}
          placeholder={i18n.specify}
        />
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
    marginBottom: 10,
  },
  labelCity: {
    marginBottom: 15,
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
});
