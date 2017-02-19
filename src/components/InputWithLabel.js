import React, { Component } from 'react';
import { Text, TextInput, StyleSheet, View, Platform } from 'react-native';

import vars from '../vars';

export default class Input extends Component {
  render() {
    const {
      label,
      placeholder,
      placeholderTextColor,
      style: customInputStyle,
      underlineColorAndroid,
    } = this.props;

    return (
      <View style={[styles.container, customInputStyle]}>
        <Text style={styles.label}>{label}</Text>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor || vars.color.placeholderTextColor}
          underlineColorAndroid={underlineColorAndroid || vars.color.underlineColorAndroid}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    ...Platform.select({
      android: {
        height: 72
      }
    })
  },
  label: {
    fontSize: 12,
    paddingLeft: 4,
    color: vars.color.grey,
  },
  input: {
    alignSelf: 'stretch',
    ...Platform.select({
      android: {
        height: 40,
        fontSize: 16
      }
    }),
  }
});
