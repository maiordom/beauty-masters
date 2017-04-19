import React, { Component } from 'react';
import { TouchableHighlight, View, Text, StyleSheet, Platform } from 'react-native';

import { formatNumber, shouldComponentUpdate } from '../utils';

import Checkbox from '../components/Checkbox';
import Input from '../components/Input';

import vars from '../vars';
import i18n from '../i18n';

export default class FilterCheckBox extends Component {
  shouldComponentUpdate = shouldComponentUpdate();

  onPress = () => {
    this.props.onChange(!this.props.active, this.props.modelName);
  };

  onChangePrice = price => {
    this.props.onChangePrice(price, this.props.modelName);
  };

  onChangeDuration = duration => {
    this.props.onChangeDuration(duration, this.props.modelName);
  };

  render() {
    const { title, active, price, duration, withInput = true } = this.props;

    return (
      <View style={styles.container}>
        <TouchableHighlight
          underlayColor="transparent"
          activeOpacity={1}
          onPress={this.onPress}
          style={styles.button}
        >
          <View style={styles.buttonContent}>
            <Text style={styles.title}>{title}</Text>
            <Checkbox onPress={this.onPress} checked={active} ref={ref => { this.f = ref; }} />
          </View>
        </TouchableHighlight>
        {active && withInput && (
          <View style={styles.fields}>
            <Input
              formatValue={formatNumber}
              inputWrapperStyle={styles.input}
              keyboardType="numeric"
              onChange={this.onChangePrice}
              placeholder={i18n.filters.price}
              replaceReg={/[^0-9.]/g}
              sign={` ${i18n.currency.roubleSign}`}
              value={price}
            />
            <Input
              formatValue={formatNumber}
              inputWrapperStyle={styles.input}
              keyboardType="numeric"
              onChange={this.onChangeDuration}
              placeholder={i18n.filters.duration}
              replaceReg={/[^0-9.]/g}
              sign={` ${i18n.time.minuteShort}`}
              value={duration}
            />
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
  input: {
    flex: 1,
    paddingLeft: 11,
    paddingRight: 11,
  },
});
