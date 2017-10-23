// @flow

import React, { Component } from 'react';
import { View, TouchableOpacity, StyleSheet, Modal } from 'react-native';
import type { TSearchFormMasterTypeProps } from './SearchFormMasterType.types';
import PopupHeader from '../PopupHeader.ios';
import PickerList from '../PickerList.ios';

import vars from '../../vars';
import i18n from '../../i18n';
import { hexToRgba } from '../../utils';

type TProps = TSearchFormMasterTypeProps;

export default class SearchFormMasterType extends Component<TProps, void> {
  render() {
    const {
      showMasterTypeModal,
      toggleMasterTypeModal,
      masterType,
      onMasterTypeSelect,
    } = this.props;

    return (
      <Modal animationType={'fade'} transparent visible={showMasterTypeModal} onRequestClose={toggleMasterTypeModal}>
        <View style={styles.container}>
          <TouchableOpacity style={styles.dismissButton} onPress={toggleMasterTypeModal} />
          <View style={styles.modalContainer}>
            <PopupHeader
              title={i18n.filters.masterType.title}
              hasCloseButton onCloseButtonPress={toggleMasterTypeModal}
            />
            <PickerList {...masterType} onChange={onMasterTypeSelect} />
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'stretch',
    backgroundColor: hexToRgba(vars.color.black, 40),
  },
  dismissButton: {
    flex: 1,
  },
  modalContainer: {
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    backgroundColor: vars.color.white,
  },
});
