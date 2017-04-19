import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight, Image } from 'react-native';

const icon = require('../icons/radio.png');
const iconChecked = require('../icons/radio-checked.png');

import vars from '../vars';

import { shouldComponentUpdate } from '../utils';

export default class Radio extends Component {
  shouldComponentUpdate = shouldComponentUpdate();

  onPress = () => {
    if (this.props.checked) {
      return;
    }

    this.props.onChange && this.props.onChange(!this.props.checked, this.props.id);
  };

  render() {
    const { label, checked } = this.props;

    return (
      <TouchableHighlight
        underlayColor="transparent"
        activeOpacity={1}
        onPress={this.onPress}
        style={styles.container}
      >
        <View style={styles.inner}>
          <Image source={checked ? iconChecked : icon} />
          <Text style={styles.label}>{label}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 48,
    paddingLeft: 24,
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    color: vars.color.black,
    marginLeft: 16,
  },
});
