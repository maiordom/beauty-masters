// @flow

import React, { Component } from 'react';
import { View, TouchableWithoutFeedback, StyleSheet, Modal } from 'react-native';
import type { TSearchFormMasterTypeProps } from '../../types/SearchFormMasterType';
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
      <Modal animationType="fade" transparent visible={showMasterTypeModal} onRequestClose={toggleMasterTypeModal}>
        <TouchableWithoutFeedback style={styles.dismissButton} onPress={toggleMasterTypeModal}>
          <View style={styles.container}>
            <View style={styles.modalContainer}>
              <PopupHeader
                title={i18n.filters.masterType.title}
                hasCloseButton
                onCloseButtonPress={toggleMasterTypeModal}
              />
              <PickerList {...masterType} onChange={onMasterTypeSelect} />
            </View>
          </View>
        </TouchableWithoutFeedback>
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
