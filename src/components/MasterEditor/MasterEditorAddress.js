import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';
import upperFirst from 'lodash/upperFirst';

import InputWithLabel from '../InputWithLabel';

import i18n from '../../i18n';

import { shouldComponentUpdate } from '../../utils';

export default class MasterEditorAddress extends Component {
  shouldComponentUpdate = shouldComponentUpdate();

  onChange = (value, modelName) => {
    this.props.onChange(upperFirst(value), modelName);
  };

  render() {
    const {
      buildingField,
      cityField,
      districtField,
      houseField,
      salonTitleField,
      streetField,
      subwayStationField,
    } = this.props;

    return (
      <View style={styles.container}>
        <InputWithLabel
          {...salonTitleField}
          onBlur={this.onChange}
          placeholder={i18n.specify}
        />
        <InputWithLabel
          {...cityField}
          onBlur={this.onChange}
          placeholder={i18n.specify}
        />
        <InputWithLabel
          {...streetField}
          onBlur={this.onChange}
          placeholder={i18n.specify}
        />
        <View style={styles.row}>
          <InputWithLabel
            {...buildingField}
            onBlur={this.onChange}
            placeholder={i18n.specify}
            style={styles.groupInput}
          />
          <View style={styles.gap} />
          <InputWithLabel
            {...houseField}
            onBlur={this.onChange}
            placeholder={i18n.specify}
            style={styles.groupInput}
          />
        </View>
        <View style={styles.row}>
          <InputWithLabel
            {...districtField}
            onBlur={this.onChange}
            placeholder={i18n.specify}
            style={styles.groupInput}
          />
          <View style={styles.gap} />
          <InputWithLabel
            {...subwayStationField}
            onBlur={this.onChange}
            placeholder={i18n.specify}
            style={styles.groupInput}
          />
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
  row: {
    flexDirection: 'row',
  },
  groupInput: {
    flex: 1,
  },
  gap: {
    width: 30,
  },
});
