/* @flow */

import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import upperFirst from 'lodash/upperFirst';

import type { TMasterEditorAddress } from '../../types/MasterEditorAddress';

import { InputWithLabel } from '../Input';

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
      addressNumber,
      onAddressChange,
      onCityChange,
      onSubwayStationChange,
    } = this.props;

    const salonTitleFieldModel = { ...salonTitleField, label: null };

    const formItemGenerator = (fieldValue: ?string, placeholder: string) => {
      const isEmptyValue = fieldValue === null;
      const formItemStyles = isEmptyValue ? [styles.formItemText, styles.placeholder] : [styles.formItemText];
      return (<View><Text style={formItemStyles}>{fieldValue || placeholder}</Text></View>);
    };

    const hasSubwayStationfield = subwayStationField != null;

    return (
      <View>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{`${i18n.configureAddress} ${addressNumber.toString()}`}</Text>
        </View>
        <View style={styles.container}>
          <View style={styles.formItem}>
            <InputWithLabel
              {...salonTitleFieldModel}
              debounce
              debounceTimer={200}
              onChange={this.onChange}
              placeholder={i18n.name}
              customInputStyle={styles.formItemTextInput}
            />
          </View>
          <View style={styles.formItem}>
            <TouchableWithoutFeedback onPress={onCityChange}>
              {formItemGenerator(cityField.value, i18n.city)}
            </TouchableWithoutFeedback>
          </View>
          <View style={hasSubwayStationfield ? styles.formItem : styles.lastFormItem}>
            <TouchableWithoutFeedback onPress={onAddressChange}>
              {formItemGenerator(addressField.value, i18n.address)}
            </TouchableWithoutFeedback>
          </View>
          {subwayStationField && (
            <View style={[styles.lastFormItem]}>
              <TouchableWithoutFeedback onPress={onSubwayStationChange}>
                {formItemGenerator(subwayStationField.value, i18n.subwayStation)}
              </TouchableWithoutFeedback>
            </View>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: vars.color.cellSeparatorColorIOS,
    borderBottomColor: vars.color.cellSeparatorColorIOS,
    paddingLeft: 16,
  },
  formItem: {
    height: 44,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: vars.color.cellSeparatorColorIOS,
  },
  formItemTextInput: {
    fontSize: 17,
    paddingBottom: 8,
  },
  formItemText: {
    fontSize: 17,
  },
  lastFormItem: {
    height: 44,
    justifyContent: 'center',
  },
  placeholder: {
    color: vars.color.grey,
  },
  title: {
    fontSize: 14,
    color: vars.color.grey,
  },
  titleContainer: {
    height: 44,
    backgroundColor: vars.color.lightGrey,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
