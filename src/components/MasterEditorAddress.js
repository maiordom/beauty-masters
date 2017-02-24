import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

import InputWithLabel from '../components/InputWithLabel';

import i18n from '../i18n';

export default class MasterEditorAddress extends Component {
  render() {
    return (
      <View style={styles.container}>
        <InputWithLabel label={i18n.name} placeholder={i18n.specify} />
        <InputWithLabel label={i18n.city} placeholder={i18n.specify} />
        <InputWithLabel label={i18n.street} placeholder={i18n.specify} />
        <View style={styles.row}>
          <InputWithLabel style={styles.groupInput} label={i18n.home} placeholder={i18n.specify} />
          <View style={styles.gap} />
          <InputWithLabel style={styles.groupInput} label={i18n.structure} placeholder={i18n.specify} />
        </View>
        <View style={styles.row}>
          <InputWithLabel style={styles.groupInput} label={i18n.district} placeholder={i18n.specify} />
          <View style={styles.gap} />
          <InputWithLabel style={styles.groupInput} label={i18n.metro} placeholder={i18n.specify} />
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
    flexDirection: 'row'
  },
  groupInput: {
    flex: 1
  },
  gap: {
    width: 30
  },
});
