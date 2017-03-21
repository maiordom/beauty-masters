import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

import InputWithLabel from '../InputWithLabel';

import i18n from '../../i18n';

import { shouldComponentUpdate } from '../../utils';

export default class MasterEditorAddress extends Component {
  shouldComponentUpdate = shouldComponentUpdate();

  render() {
    const {
      salonTitleField,
      cityField,
      streetField,
      districtField,
      subwayStationField,
      houseField,
      buildingField,
      onChange,
    } = this.props;

    return (
      <View style={styles.container}>
        <InputWithLabel {...salonTitleField} onChange={onChange} placeholder={i18n.specify} />
        <InputWithLabel {...cityField} onChange={onChange} placeholder={i18n.specify} />
        <InputWithLabel {...streetField} onChange={onChange} placeholder={i18n.specify} />
        <View style={styles.row}>
          <InputWithLabel style={styles.groupInput} onChange={onChange} {...buildingField} placeholder={i18n.specify} />
          <View style={styles.gap} />
          <InputWithLabel style={styles.groupInput} onChange={onChange} {...houseField} placeholder={i18n.specify} />
        </View>
        <View style={styles.row}>
          <InputWithLabel style={styles.groupInput} onChange={onChange} {...districtField} placeholder={i18n.specify} />
          <View style={styles.gap} />
          <InputWithLabel style={styles.groupInput} onChange={onChange} {...subwayStationField} placeholder={i18n.specify} />
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
