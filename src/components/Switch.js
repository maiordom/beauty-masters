// @flow

import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, TouchableWithoutFeedback } from 'react-native';

import { hexToRgba, shouldComponentUpdate } from '../utils';
import SwitchBase from './SwitchBase';

type TProps = {
  customStyles: {
    container?: Object,
    title?: Object,
  },
  onChange: (state: boolean, modelName?: string) => void,
  modelName?: string,
  title: string,
  value: boolean,
};

export default class CustomSwitch extends Component<TProps, void> {
  shouldComponentUpdate = shouldComponentUpdate();

  ref = {
    toggle() { return; },
    changeStateImmediately(value: boolean) { return; }
  };

  onChange = (state: boolean) => {
    this.props.onChange && this.props.onChange(state, this.props.modelName);
  };

  setRef = (ref: Object) => {
    this.ref = ref;
  };

  onPress = () => {
    this.ref.toggle();
  };

  componentWillReceiveProps(nextProps: TProps) {
    if (typeof nextProps.value === 'boolean') {
      this.ref && this.ref.changeStateImmediately(nextProps.value);
    }
  }

  render() {
    const { title, value, customStyles = {} } = this.props;

    return (
      <TouchableWithoutFeedback onPress={this.onPress}>
        <View style={[styles.container, customStyles.container]}>
          <Text style={[styles.title, customStyles.title]}>{title}</Text>
          <SwitchBase
            ref={this.setRef}
            active={value}
            buttonRadius={11}
            switchWidth={38}
            switchHeight={14}
            inactiveButtonColor={'#E8E8E8'}
            inactiveButtonPressedColor={'#E8E8E8'}
            activeButtonColor={'#F65F6E'}
            activeButtonPressedColor={'#F65F6E'}
            activeBackgroundColor={hexToRgba('#F65F6E', 50)}
            inactiveBackgroundColor={hexToRgba('#374650', 40)}
            borderWidth={0}
            onChangeState={this.onChange}
          />
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
    color: '#283741',
    ...Platform.select({
      android: {
        fontSize: 16,
      },
    }),
  },
});
