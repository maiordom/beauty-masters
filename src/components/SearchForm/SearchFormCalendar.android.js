// @flow

import React from 'react';
import { Text, View, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import moment from 'moment';

import type { TSearchFormCalendar } from '../../types/SearchFormCalendar';

import Calendar from '../Calendar';

import vars from '../../vars';
import i18n from '../../i18n';
import { hexToRgba } from '../../utils';

type TProps = TSearchFormCalendar;

const SearchFormCalendar = ({
  onDateSelect,
  selectedDates,
  showCalendar,
  toggleCalendarModal,
}: TProps) => (
  <Modal
    animationType="fade"
    onRequestClose={() => {}}
    transparent
    visible={showCalendar}
  >
    <View style={styles.container}>
      <View style={styles.modalContainer}>
        <Text style={styles.title}>
          {i18n.filters.availableDays}
        </Text>
        <Calendar
          containerWidth={328}
          multiSelect
          onDateSelect={onDateSelect}
          selectedDates={selectedDates}
        />
        <TouchableOpacity
          onPress={toggleCalendarModal}
          style={styles.closeButton}
        >
          <Text style={styles.closeButtonTitle}>{i18n.masterCard.ok}</Text>
        </TouchableOpacity>
      </View>
    </View>
  </Modal>
);

export default SearchFormCalendar;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: hexToRgba(vars.color.black, 40),
  },
  modalContainer: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: vars.color.white,
    borderRadius: 2,
  },
  title: {
    paddingTop: 24,
    paddingLeft: 24,
    paddingBottom: 14,
    fontSize: 20,
    color: vars.color.black,
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 14,
    paddingTop: 0,
  },
  closeButtonTitle: {
    fontSize: 14,
    color: vars.color.red,
  },
});
