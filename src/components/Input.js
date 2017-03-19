import React, { Component } from 'react';
import { TextInput, StyleSheet, View, Platform, Image } from 'react-native';

import vars from '../vars';

import { shouldComponentUpdate } from '../utils';

export default class Input extends Component {
  constructor(props) {
    super();

    this.state = {
      value: props.value || '',
      isFocused: false,
    };
  }

  shouldComponentUpdate = shouldComponentUpdate();

  onChangeText = value => {
    const { formatValue, replaceReg } = this.props;

    if (replaceReg) {
      value = value.replace(replaceReg, '');
    }

    if (formatValue) {
      this.setState({ value: formatValue(value) });
    } else {
      this.setState({ value });
    }
  };

  onFocus = () => {
    this.setState({ isFocused: true });
  };

  onBlur = () => {
    const { replaceReg } = this.props;
    let value = this.state.value;

    if (replaceReg) {
      value = value.replace(replaceReg, '');
    }

    this.setState({ isFocused: false });
    this.props.onChange && this.props.onChange(value, this.props.modelName);
  };

  getValue() {
    const { sign } = this.props;

    let value = this.state.value;

    if (value && sign && !this.state.isFocused) {
      value += sign;
    }

    return value || '';
  }

  render() {
    const {
      editable,
      icon,
      inputWrapperStyle,
      keyboardType,
      placeholder,
      placeholderTextColor,
      style: customInputStyle,
      underlineColorAndroid,
    } = this.props;

    const value = this.getValue();

    return (
      <View style={[
        inputStyle.inputWrapper,
        inputWrapperStyle,
        editable === false && inputStyle.inputDisabled
      ]}>
        {icon && (
          <Image source={icon} />
        )}
        <TextInput
          editable={editable !== undefined ? editable : true}
          keyboardType={keyboardType}
          onBlur={this.onBlur}
          onChangeText={this.onChangeText}
          onFocus={this.onFocus}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor || vars.color.placeholderTextColor}
          style={[customInputStyle, inputStyle.input]}
          underlineColorAndroid={underlineColorAndroid || vars.color.underlineColorAndroid}
          value={value}
        />
      </View>
    );
  }
}

const inputStyle = StyleSheet.create({
  inputDisabled: {
    opacity: 0.4,
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
  },
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
  }
});
