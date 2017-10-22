// @flow

import React, { Component } from 'react';
import { Text, View, TouchableOpacity, Image, StyleSheet } from 'react-native';

import vars from '../vars';
import { hexToRgba } from '../utils';

const icons = {
  close: require('../icons/ios/close.png'),
  accept: require('../icons/ios/accept.png'),
};

type TProps = {
  title: string,
  hasCloseButton: boolean,
  hasAcceptButton: boolean,
  onCloseButtonPress: () => void,
  onAcceptButtonPress: () => void,
};

export default class PopupHeader extends Component<TProps, void> {
  static defaultProps = {
    title: '',
    hasCloseButton: true,
    hasAcceptButton: false,
    onCloseButtonPress: () => {},
    onAcceptButtonPress: () => {},
  };

  render() {
    const {
      title,
      hasCloseButton,
      hasAcceptButton,
      onCloseButtonPress,
      onAcceptButtonPress,
    } = this.props;
    return (
      <View style={styles.container}>
        {
          hasCloseButton && (
            <TouchableOpacity style={styles.button} onPress={onCloseButtonPress}>
              <Image source={icons.close} />
            </TouchableOpacity>
          )
        }
        <View style={styles.flexStub} />
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            {title}
          </Text>
        </View>
        {
          hasAcceptButton && (
            <TouchableOpacity style={styles.button} onPress={onAcceptButtonPress}>
              <Image source={icons.accept} />
            </TouchableOpacity>
          )
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 44,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: hexToRgba('#1E232D'),
  },
  flexStub: {
    flexGrow: 1,
  },
  button: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  titleContainer: {
    position: 'absolute',
    left: 36,
    top: 0,
    right: 36,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
    textAlign: 'center',
    color: vars.color.white,
  },
});
