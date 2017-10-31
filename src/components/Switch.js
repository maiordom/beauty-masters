// @flow

import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform, TouchableWithoutFeedback } from 'react-native';

import { hexToRgba, shouldComponentUpdate } from '../utils';
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
