import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

import Radio from './Radio';

import i18n from '../i18n';

export default class RadioGroup extends Component {
  render() {
    const { items } = this.props;

    return (
      <View style={styles.container}>
        {items.map((item, key) => (
          <Radio key={key} label={item.label} checked={item.checked} />
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {}
});
