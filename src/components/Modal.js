// @flow

import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Modal,
  Platform,
} from 'react-native';

import type { Children } from 'react';

import vars from '../vars';
import { hexToRgba } from '../utils';

type TProps = {
  children?: Children,
  isVisible: boolean,
  onRequestClose?: () => void
};

export default class ModalComponent extends Component<TProps, void> {
  render() {
    const {
      children,
      isVisible,
      onRequestClose = () => {},
    } = this.props;

    return (
      <Modal
        animationType={'fade'}
        transparent
        visible={isVisible}
        onRequestClose={onRequestClose}
      >
        <View style={styles.modalWrapper}>
          <View style={styles.modalContainer}>
            {children}
          </View>
        </View>
      </Modal>
    );
  }
}
const styles = StyleSheet.create({
  modalWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: hexToRgba(vars.color.black, 40),
  },
  modalContainer: {
    ...Platform.select({
      android: {
        backgroundColor: vars.color.white,
        borderRadius: 2,
        marginLeft: 40,
        marginRight: 40,
        padding: 24,
      },
      ios: {
        backgroundColor: hexToRgba(vars.color.white, 90),
        borderRadius: 12,
        marginLeft: 28,
        marginRight: 28,
      },
    }),
  },
});
