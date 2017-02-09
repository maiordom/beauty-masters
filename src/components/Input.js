import React, { Component } from 'react';
import { TextInput, StyleSheet, View, Platform, Image } from 'react-native';

import vars from '../vars';

export default class Input extends Component {
  render() {
    const {
      icon,
      style: customInputStyle,
      placeholder,
      placeholderTextColor,
      underlineColorAndroid
    } = this.props;

    return (
      <View style={inputStyle.inputWrapper}>
        {icon && (
          <Image source={icon} />
        )}
        <TextInput
          style={[customInputStyle, inputStyle.input]}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor || vars.color.placeholderTextColor}
          underlineColorAndroid={underlineColorAndroid || vars.color.underlineColorAndroid}
        />
      </View>
    );
  }
}

const inputStyle = StyleSheet.create({
  input: {
    flex: 1,
    alignSelf: 'stretch',
    height: 44,
    ...Platform.select({
      android: {
        height: 48,
        fontSize: 16
      }
    })
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        borderBottomWidth: 1,
        borderBottomColor: '#E4E6E8'
      }
    })
  }
});
