import React, { Component } from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { hexToRgba } from '../utils';

import SwitchBase from './SwitchBase';

export default class CustomSwitch extends Component {
  onChangeState = state => {
    this.props.onChangeState && this.props.onChangeState(state);
  };

  render() {
    const { title } = this.props;

    return (
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <SwitchBase
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
          onChangeState={this.onChangeState}
        />
      </View>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 4,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 44,
    ...Platform.select({
      android: {
        height: 48
      }
    })
  },
  title: {
    color: '#283741',
    ...Platform.select({
      android: {
        fontSize: 16
      }
    })
  }
});
