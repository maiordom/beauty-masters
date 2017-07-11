// @flow

import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Modal,
} from 'react-native';

import type { Children } from 'react';

import vars from '../vars';
import { hexToRgba } from '../utils';

type Props = {
  children?: Children,
  isVisible: boolean,
  onRequestClose: () => void
};

export default class ModalComponent extends Component<void, Props, void> {
  render() {
    const {
      children,
      isVisible,
      onRequestClose = () => {},
    } = this.props;

    return (
      <Modal
        animationType='fade'
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
    marginLeft: 40,
    marginRight: 40,
    padding: 24,
    backgroundColor: vars.color.white,
    borderRadius: 2,
  },
  modalTitle: {
    fontSize: 20,
    color: vars.color.black,
  },
});
