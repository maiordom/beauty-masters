// @flow
import React from 'react';
import {
  Dimensions,
  View,
  TouchableWithoutFeedback,
  StyleSheet,
  Modal,
} from 'react-native';
import moment from 'moment';

import type { TSearchFormCelendar } from './SearchFormCalendar.types';

import Calendar from '../Calendar';
import PopupHeader from '../PopupHeader.ios';

import vars from '../../vars';
import i18n from '../../i18n';
import { hexToRgba } from '../../utils';

type TProps = TSearchFormCelendar;

const SearchFormCalendar = ({
  showCalendar,
  selectedDate,
  onDateSelect,
  toggleCalendarModal,
}: TProps) => (
  <Modal animationType={'fade'} transparent visible={showCalendar} onRequestClose={toggleCalendarModal}>
    <TouchableWithoutFeedback style={styles.dismissButton} onPress={toggleCalendarModal} >
      <View style={styles.container}>
        <View style={styles.modalContainer}>
          <PopupHeader
            title={i18n.filters.availableDays}
            hasCloseButton
            onCloseButtonPress={toggleCalendarModal}
          />
          <Calendar
            activeFrom={moment()}
            selectedDate={selectedDate}
            onDateSelect={onDateSelect}
            containerWidth={Dimensions.get('window').width}
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
});
