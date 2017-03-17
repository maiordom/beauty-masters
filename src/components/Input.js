import React, { Component } from 'react';
import { TextInput, StyleSheet, View, Platform, Image } from 'react-native';

import vars from '../vars';

export default class Input extends Component {
  constructor() {
    super();

    this.state = { text: '' };
  }

  onChangeText = text => {
    this.setState({ text });
  };

  onBlur = () => {
    this.props.onChange && this.props.onChange(this.props.modelName, this.state.text);
  };

  render() {
    const {
      editable,
      icon,
      inputWrapperStyle,
      placeholder,
      placeholderTextColor,
      style: customInputStyle,
      underlineColorAndroid,
    } = this.props;

    return (
      <View style={[inputStyle.inputWrapper, inputWrapperStyle]}>
        {icon && (
          <Image source={icon} />
        )}
        <TextInput
          editable={editable !== undefined ? editable : true}
          onBlur={this.onBlur}
          onChangeText={this.onChangeText}
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
