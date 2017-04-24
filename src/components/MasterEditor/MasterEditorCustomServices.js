import React, { Component } from 'react';
import { View, Text, Platform, StyleSheet, TouchableHighlight } from 'react-native';

import FilterCheckBox from '../FilterCheckBox';

import i18n from '../../i18n';
import vars from '../../vars';

const i18nAddService = Platform.select({
  ios: i18n.filters.addService,
  android: i18n.filters.addService.toUpperCase(),
});

export default class MasterEditorCustomServices extends Component {
  addService = () => {
    this.props.addService(this.props.modelName);
  };

  render() {
    const { items } = this.props;

    return (
      <View style={styles.container}>
        {items.map(item => <FilterCheckBox {...item} />)}
        <TouchableHighlight style={styles.addService} onPress={this.addService}>
          <Text style={styles.addServiceText}>{i18nAddService}</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  addService: {
    alignItems: 'center',
    height: 50,
    justifyContent: 'center',
  },
  addServiceText: {
    color: vars.color.red,
    fontSize: 14,
  }
});
