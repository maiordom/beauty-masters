import React, { Component } from 'react';
import { Text, TextInput, StyleSheet, View, Platform, Image } from 'react-native';
import debounce from 'lodash/debounce';

import vars from '../vars';

import { shouldComponentUpdate } from '../utils';

class InputBase extends Component {
  constructor(props) {
    super();

    this.state = {
      value: props.value || '',
      isFocused: false
    };
  }

  shouldComponentUpdate = shouldComponentUpdate();

  debounceOnChange = () =>
    debounce(
      () => {
        this.props.onChange && this.props.onChange(this.state.value, this.props.modelName);
      },
      this.props.debounce || 1000
    )();

  onChangeText = value => {
    const { formatValue, replaceReg } = this.props;

    if (replaceReg) {
      value = value.replace(replaceReg, '');
    }

    if (formatValue) {
      this.setState({ value: formatValue(value) }, this.debounceOnChange);
    } else {
      this.setState({ value }, this.debounceOnChange);
    }
  };

  onFocus = () => {
    this.setState({ isFocused: true });
  };

  onBlur = () => {
    this.setState({ isFocused: false });
  };

  getValue() {
    const { sign } = this.props;

    let value = this.state.value;

    if (value && sign && !this.state.isFocused) {
      value += sign;
    }

    return value || '';
  }
}

export class InputWithLabel extends InputBase {
  render() {
    const {
      editable,
      keyboardType,
      label,
      placeholder,
      placeholderTextColor,
      style: customInputStyle,
      underlineColorAndroid
    } = this.props;

    const value = this.getValue();

    return (
      <View style={[inputWithLabelStyle.container, customInputStyle]}>
        <Text style={inputWithLabelStyle.label}>{label}</Text>
        <TextInput
          editable={editable !== undefined ? editable : true}
          keyboardType={keyboardType}
          onBlur={this.onBlur}
          onChangeText={this.onChangeText}
          onFocus={this.onFocus}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor || vars.color.placeholderTextColor}
          style={inputWithLabelStyle.input}
          underlineColorAndroid={underlineColorAndroid || vars.color.underlineColorAndroid}
          value={value}
        />
      </View>
    );
  }
}

export default class Input extends InputBase {
  render() {
    const {
      editable,
      icon,
      inputWrapperStyle,
      keyboardType,
      placeholder,
      placeholderTextColor,
      style: customInputStyle,
      underlineColorAndroid
    } = this.props;

    const value = this.getValue();

    return (
      <View style={[inputStyle.inputWrapper, inputWrapperStyle, editable === false && inputStyle.inputDisabled]}>
        {icon && <Image source={icon} />}
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
    opacity: 0.4
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

const inputWithLabelStyle = StyleSheet.create({
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
    color: vars.color.grey
  },
  input: {
    alignSelf: 'stretch',
    ...Platform.select({
      android: {
        height: 40,
        fontSize: 16
      }
    })
  }
});
