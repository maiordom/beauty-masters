// @flow

import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, TouchableWithoutFeedback, Switch } from 'react-native';

import { hexToRgba, shouldComponentUpdate } from '../utils';
import vars from '../vars';
import SwitchBase from './SwitchBase';

type TProps = {
  customStyles?: {
    container?: Object,
    title?: Object,
  },
  onChange: (state: boolean, modelName?: string) => void,
  modelName?: string,
  title: string,
  value?: boolean,
};

export default class CustomSwitch extends Component<TProps, void> {
  shouldComponentUpdate = shouldComponentUpdate();

  ref = {
    toggle() { },
    changeStateImmediately(value: boolean) { },
    value: false,
  };

  onChange = (state: boolean) => {
    this.props.onChange && this.props.onChange(state, this.props.modelName);
  };

  setRef = (ref: Object) => {
    this.ref = ref;
  };

  onPress = () => {
    if (Platform.OS === 'android') {
      this.ref.toggle();
    } else {
      this.onChange(!this.ref.value);
    }
  };

  componentWillReceiveProps(nextProps: TProps) {
    if (typeof nextProps.value === 'boolean' && this.ref != null) {
      if (Platform.OS === 'android') {
        this.ref.changeStateImmediately(nextProps.value);
      } else {
        this.ref.value = nextProps.value;
      }
    }
  }

  render() {
    const { title, value, customStyles = {} } = this.props;

    return (
      <TouchableWithoutFeedback onPress={this.onPress}>
        <View style={[styles.container, customStyles.container]}>
          <Text style={[styles.title, customStyles.title]}>{title}</Text>
          {Platform.select({
            ios: (<Switch
              value={value}
              ref={this.setRef}
              onValueChange={this.onChange}
              onTintColor={vars.color.red}
            />),
            android: (<SwitchBase
              active={value}
              activeBackgroundColor={hexToRgba('#F65F6E', 50)}
              activeButtonColor={'#F65F6E'}
              activeButtonPressedColor={'#F65F6E'}
              borderWidth={0}
              buttonRadius={11}
              inactiveBackgroundColor={hexToRgba('#374650', 40)}
              inactiveButtonColor={'#E8E8E8'}
              inactiveButtonPressedColor={'#E8E8E8'}
              onChangeState={this.onChange}
              ref={this.setRef}
              switchHeight={14}
              switchWidth={38}
            />),
          })}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 44,
    ...Platform.select({
      android: {
        height: 48,
      },
    }),
  },
  title: {
    color: vars.color.black,
    ...Platform.select({
      android: {
        fontSize: 16,
      },
      ios: {
        fontSize: 17,
      },
    }),
  },
});
