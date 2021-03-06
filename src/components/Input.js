// @flow

import React, { PureComponent } from 'react';
import { Text, TextInput, StyleSheet, View, Platform, Image } from 'react-native';
import debounce from 'lodash/debounce';

import vars from '../vars';

type TProps = {
  autoCorrect?: boolean,
  blurOnSubmit?: boolean,
  debounce?: boolean,
  editable?: boolean,
  formatValue?: (value: any) => string,
  icon?: string,
  inputWrapperStyle?: Object,
  keyboardType?: string,
  label?: string,
  modelName?: string,
  multiline?: boolean,
  numberOfLines?: number,
  onBlur?: (value: string, modelName?: string) => void,
  onChange?: (value: string, modelName?: string) => void,
  placeholder?: string,
  placeholderTextColor?: string,
  replaceReg?: Object,
  returnKeyType?: string,
  secureTextEntry?: boolean,
  sign?: string,
  style?: Object,
  underlineColorAndroid?: string,
  value?: string | number,
};

type TState = {
  isFocused: boolean,
  value: string,
};

class InputBase extends PureComponent<TProps, TState> {
  constructor(props: TProps) {
    super(props);

    this.debounceOnChange = debounce(() => {
      const value = this.clearValue(this.state.value);

      this.props.onChange && this.props.onChange(value, this.props.modelName);
    }, props.debounceTimer || 1000);
  }

  state = {
    value: this.props.value && this.props.value.toString() || '',
    isFocused: false,
  };

  componentWillReceiveProps(nextProps) {
    if (!('value' in nextProps)) {
      return;
    }

    const { value } = nextProps;

    if (value === null) {
      this.state.value = '';
    } else if (this.props.value !== nextProps.value) {
      this.state.value = String(value).toString();
    }
  }

  onChangeText = value => {
    const { formatValue } = this.props;

    value = this.clearValue(value);

    this.setState(
      { value: formatValue ? formatValue(value) : value },
      () => {
        if (this.props.debounce) {
          this.debounceOnChange();
        } else {
          this.props.onChange && this.props.onChange(value, this.props.modelName);
        }
      },
    );
  };

  onFocus = () => {
    this.setState({ isFocused: true });
  };

  onBlur = () => {
    const value = this.clearValue(this.state.value);

    this.setState({ isFocused: false });
    this.props.onBlur && this.props.onBlur(value, this.props.modelName);
  };

  clearValue = (value: string) => {
    const { replaceReg } = this.props;

    if (replaceReg) {
      value = value.replace(replaceReg, '');
    }

    return value;
  };

  getValue() {
    const { sign, formatValue } = this.props;

    let value = this.clearValue(this.state.value);

    value = formatValue ? formatValue(value) : value;

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
      required,
      style: customContainerStyle,
      customInputStyle,
      underlineColorAndroid,
    } = this.props;

    const value = this.getValue();

    return (
      <View style={[inputWithLabelStyle.container, customContainerStyle]}>
        <Text style={inputWithLabelStyle.label}>
          {label}
          {required && (
            <Text style={inputWithLabelStyle.required}> *</Text>
          )}
        </Text>
        <TextInput
          editable={editable !== undefined ? editable : true}
          keyboardType={keyboardType}
          onBlur={this.onBlur}
          onChangeText={this.onChangeText}
          onFocus={this.onFocus}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor || vars.color.placeholderColor}
          style={[inputWithLabelStyle.input, customInputStyle]}
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
      autoCorrect,
      blurOnSubmit,
      editable,
      icon,
      inputWrapperStyle,
      keyboardType = 'default',
      multiline,
      numberOfLines,
      placeholder,
      placeholderTextColor,
      returnKeyType,
      secureTextEntry,
      style: customInputStyle,
      underlineColorAndroid,
    } = this.props;

    const value = this.getValue();

    return (
      <View style={[
        inputStyle.inputWrapper,
        inputWrapperStyle,
        editable === false && inputStyle.inputDisabled,
      ]}
      >
        {icon && <Image source={icon} />}
        <TextInput
          autoCorrect={autoCorrect !== undefined ? autoCorrect : true}
          blurOnSubmit={blurOnSubmit}
          editable={editable !== undefined ? editable : true}
          keyboardType={keyboardType}
          multiline={multiline}
          numberOfLines={numberOfLines}
          onBlur={this.onBlur}
          onChangeText={this.onChangeText}
          onFocus={this.onFocus}
          placeholder={placeholder}
          placeholderTextColor={placeholderTextColor || vars.color.placeholderColor}
          returnKeyType={returnKeyType}
          secureTextEntry={secureTextEntry}
          style={[inputStyle.input, customInputStyle]}
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
        borderBottomColor: vars.color.cellSeparatorColorIOS,
      },
    }),
  },
  input: {
    paddingLeft: 4,
    flex: 1,
    alignSelf: 'stretch',
    ...Platform.select({
      android: {
        height: 48,
        fontSize: 16,
      },
      ios: {
        height: 44,
        fontSize: 17,
      },
    }),
  },
});

const inputWithLabelStyle = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'center',
    ...Platform.select({
      android: {
        height: 72,
      },
    }),
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
        fontSize: 16,
      },
    }),
  },
  required: {
    color: vars.color.red,
  },
});
