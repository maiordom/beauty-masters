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
        <InputWithLabel
          {...salonTitleField}
          onBlur={onChange}
          placeholder={i18n.specify}
        />
        <InputWithLabel
          {...cityField}
          onBlur={onChange}
          placeholder={i18n.specify}
        />
        <InputWithLabel
          {...streetField}
          onBlur={onChange}
          placeholder={i18n.specify}
        />
        <View style={styles.row}>
          <InputWithLabel
            {...buildingField}
            onBlur={onChange}
            placeholder={i18n.specify}
            style={styles.groupInput}
          />
          <View style={styles.gap} />
          <InputWithLabel
            {...houseField}
            onBlur={onChange}
            placeholder={i18n.specify}
            style={styles.groupInput}
          />
        </View>
        <View style={styles.row}>
          <InputWithLabel
            {...districtField}
            onBlur={onChange}
            placeholder={i18n.specify}
            style={styles.groupInput}
          />
          <View style={styles.gap} />
          <InputWithLabel
            {...subwayStationField}
            onBlur={onChange}
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
