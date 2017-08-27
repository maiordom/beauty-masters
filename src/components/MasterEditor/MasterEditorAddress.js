/* @flow */

import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';
import upperFirst from 'lodash/upperFirst';

import InputWithLabel from '../InputWithLabel';
import Filter from '../Filter';

import i18n from '../../i18n';

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
          onBlur={this.onChange}
          placeholder={i18n.specify}
        />
        <Filter
          customStyles={{ container: styles.filter }}
          onChange={() => {}}
          spacing={false}
          subtitle={cityField.value || i18n.specify}
          title={cityField.label}
        />
        <Filter
          customStyles={{ container: styles.filter }}
          onChange={onAddressChange}
          spacing={false}
          title={addressField.label}
          subtitle={addressField.value || i18n.specify}
        />
        <InputWithLabel
          {...subwayStationField}
          onBlur={this.onChange}
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
});
