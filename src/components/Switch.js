import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';

import { hexToRgba, shouldComponentUpdate } from '../utils';
import SwitchBase from './SwitchBase';

export default class CustomSwitch extends Component {
  shouldComponentUpdate = shouldComponentUpdate();

  onChange = state => {
    this.props.onChange && this.props.onChange(state, this.props.modelName);
  };

  setRef = ref => {
    this.ref = ref;
  };

  componentWillReceiveProps(nextProps) {
    if (typeof nextProps.value === 'boolean') {
      this.ref && this.ref.changeStateImmediately(nextProps.value);
    }
  }

  render() {
    const { title, value, customStyles = {} } = this.props;

    return (
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
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 4,
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
