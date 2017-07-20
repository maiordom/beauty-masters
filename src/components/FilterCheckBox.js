/* @flow */

import React, { Component } from 'react';
import { TouchableHighlight, View, Text, StyleSheet, Platform, Image } from 'react-native';

import { formatNumber, shouldComponentUpdate } from '../utils';

import Checkbox from '../components/Checkbox';
import Input from '../components/Input';

import vars from '../vars';
import i18n from '../i18n';

type onChange = (active: boolean, modelName: ?string, index?: number) => void;
type onChangeDuration = (duration: string, modelName?: string, index?: number) => void;
type onChangePrice = (price: number, modelName?: string, index?: number) => void;
type onChangeTitle = (title: string, modelName?: string, index?: number) => void;

type TProps = {
  active?: boolean,
  duration?: string,
  errorFillPrice?: boolean,
  index?: number,
  modelName?: string,
  onChange: onChange,
  onChangeDuration?: onChangeDuration,
  onChangePrice?: onChangePrice,
  onChangeTitle?: onChangeTitle,
  price?: number,
  required?: boolean,
  title?: string,
  titlePlaceholder?: string,
  titleType?: string,
  withInput?: boolean,
};

type TDefaultProps = {
  onChange: onChange,
  onChangeDuration: onChangeDuration,
  onChangePrice: onChangePrice,
  onChangeTitle: onChangeTitle,
}

const icons = {
  ...Platform.select({
    android: {
      warning: require('../icons/android/warning.png'),
    },
  }),
};

export default class FilterCheckBox extends Component<TDefaultProps, TProps, void> {
  static defaultProps = {
    onChange: (active: boolean, modelName: ?string, index?: number) => {},
    onChangeDuration: (duration: string, modelName?: string, index?: number) => {},
    onChangePrice: (price: number, modelName?: string, index?: number) => {},
    onChangeTitle: (title: string, modelName?: string, index?: number) => {},
  };

  durationRef: Object;
  priceRef: Object;

  shouldComponentUpdate = shouldComponentUpdate();

  onPress = () => {
    if (this.props.required) {
      return;
    }

    this.props.onChange && this.props.onChange(
      !this.props.active,
      this.props.modelName,
      this.props.index,
    );
  };

  onChangePrice = (price: string) => {
    this.props.onChangePrice && this.props.onChangePrice(
      Number(price),
      this.props.modelName,
      this.props.index,
    );
  };

  onChangeDuration = (duration: string) => {
    this.props.onChangeDuration && this.props.onChangeDuration(
      duration,
      this.props.modelName,
      this.props.index,
    );
  };

  onChangeTitle = (title: string) => {
    this.props.onChangeTitle && this.props.onChangeTitle(
      title,
      this.props.modelName,
      this.props.index,
    );
  };

  setPriceRef = (ref: Object) => this.priceRef = ref;
  setDurationRef = (ref: Object) => this.durationRef = ref;

  render() {
    const {
      active,
      duration,
      errorFillPrice,
      price,
      required,
      title,
      titlePlaceholder,
      titleType = 'text',
      withInput = true,
    } = this.props;

    const requiredText = required && (
      <Text style={styles.required}> *</Text>
    );

    const errorView = <View style={styles.error}>
      <Text style={styles.errorText}>{i18n.fillField}</Text>
      <Image source={icons.warning} />
    </View>;

    return (
      <View style={styles.container}>
        <TouchableHighlight
          underlayColor="transparent"
          activeOpacity={1}
          onPress={this.onPress}
          style={[styles.button, titleType === 'input' && styles.buttonWithInput]}
        >
          <View style={styles.buttonContent}>
            {titleType === 'text' && (
              <Text style={styles.title}>{title}{requiredText}</Text>
            )}
            {titleType === 'input' && (
              <Input
                inputWrapperStyle={styles.titleInput}
                onChange={this.onChangeTitle}
                placeholder={titlePlaceholder}
                value={title}
              />
            )}
            <Checkbox onPress={this.onPress} checked={active} />
          </View>
        </TouchableHighlight>
        {active && withInput && (
          <View style={styles.fields}>
            <View style={styles.inputWrapper}>
              <Input
                formatValue={formatNumber}
                inputWrapperStyle={styles.input}
                keyboardType="numeric"
                onChange={this.onChangePrice}
                placeholder={i18n.filters.price}
                ref={this.setPriceRef}
                replaceReg={/[^0-9.]/g}
                sign={` ${i18n.currency.roubleSign}`}
                value={price}
              />
              {errorFillPrice && errorView}
            </View>
            <View style={styles.inputWrapper}>
              <Input
                formatValue={formatNumber}
                inputWrapperStyle={styles.input}
                keyboardType="numeric"
                onChange={this.onChangeDuration}
                placeholder={i18n.filters.duration}
                ref={this.setDurationRef}
                replaceReg={/[^0-9.]/g}
                sign={` ${i18n.time.minuteShort}`}
                value={duration}
              />
            </View>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  button: {
    paddingLeft: 15,
    paddingRight: 15,
  },
  buttonWithInput: {
    paddingLeft: 11,
  },
  buttonContent: {
    height: 44,
    ...Platform.select({
      android: {
        height: 48,
      },
    }),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: vars.color.black,
    ...Platform.select({
      android: {
        fontSize: 16,
      },
    }),
  },
  fields: {
    flexDirection: 'row',
  },
  titleInput: {
    flex: 1,
  },
  inputWrapper: {
    flex: 1,
  },
  input: {
    flex: 1,
    paddingLeft: 11,
    paddingRight: 11,
  },
  required: {
    color: vars.color.red,
  },
  error: {
    marginTop: 3,
    paddingLeft: 15,
    paddingRight: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  errorText: {
    color: vars.color.red,
  },
});
