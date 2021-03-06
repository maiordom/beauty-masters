// @flow
import React from 'react';
import {
  Dimensions,
  View,
  TouchableWithoutFeedback,
  StyleSheet,
  Modal,
} from 'react-native';

import type { TSearchFormCalendar } from './SearchFormCalendar.types';

import Calendar from '../../Calendar';
import PopupHeader from '../../PopupHeader.ios';

import vars from '../../../vars';
import i18n from '../../../i18n';
import { hexToRgba } from '../../../utils';

type TProps = TSearchFormCalendar;

const SearchFormCalendar = ({
  onDateSelect,
  selectedDates,
  showCalendar,
  toggleCalendarModal,
}: TProps) => (
  <Modal
    animationType="fade"
    onRequestClose={toggleCalendarModal}
    transparent
    visible={showCalendar}
  >
    <TouchableWithoutFeedback style={styles.dismissButton} onPress={toggleCalendarModal} >
      <View style={styles.container}>
        <View style={styles.modalContainer}>
          <PopupHeader
            title={i18n.filters.availableDays}
            hasAcceptButton
            hasCloseButton={false}
            onAcceptButtonPress={toggleCalendarModal}
          />
          <Calendar
            containerWidth={Dimensions.get('window').width}
            multiSelect
            onDateSelect={onDateSelect}
            selectedDates={selectedDates}
          />
        </View>
      </View>
    </TouchableWithoutFeedback>
  </Modal>
);

export default SearchFormCalendar;

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
  closeButton: {
    flex: 1,
    padding: 12,
    paddingTop: 0,
  },
  closeButtonTitle: {
    fontSize: 14,
    color: vars.color.red,
    fontWeight: '600',
    paddingLeft: 20,
    paddingRight: 20,
    paddingBottom: 10,
  },
});
