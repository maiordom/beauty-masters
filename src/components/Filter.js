import React, { Component } from 'react';
import { TouchableHighlight, View, Text, StyleSheet, Platform } from 'react-native';

import Checkbox from '../components/Checkbox';
import Input from '../components/Input';

import vars from '../vars';
import i18n from '../i18n';

import { shouldComponentUpdate } from '../utils';

export default class Filter extends Component {
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
    const { title, active, price, duration } = this.props;

    return (
      <View style={[styles.container, active && styles.containerActive]}>
        <TouchableHighlight
          underlayColor='transparent'
          activeOpacity={1}
          onPress={this.onPress}
          style={styles.button}
        >
          <View style={styles.buttonContent}>
            <Text style={styles.title}>{title}</Text>
            <Checkbox checked={active} ref={ref => { this.checkboxRef = ref; }} />
          </View>
        </TouchableHighlight>
        {active && (
          <View style={styles.fields}>
            <Input
              value={price}
              placeholder={i18n.filters.price}
              onChange={this.onChangePrice}
              inputWrapperStyle={styles.input}
            />
            <Input
              value={duration}
              placeholder={i18n.filters.duration}
              onChange={this.onChangeDuration}
              inputWrapperStyle={styles.input}
            />
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  containerActive: {
    marginBottom: 24
  },
  button: {
    paddingLeft: 15,
    paddingRight: 15
  },
  buttonContent: {
    height: 44,
    ...Platform.select({
      android: {
        height: 48
      }
    }),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    color: vars.color.black,
    ...Platform.select({
      android: {
        fontSize: 16
      }
    })
  },
  fields: {
    flexDirection: 'row'
  },
  input: {
    flex: 1,
    paddingLeft: 11,
    paddingRight: 11
  }
});
