// @flow

import React from 'react';
import { Text, View, StyleSheet, Modal } from 'react-native';
import moment from 'moment';

import type { TSearchFormCelendar } from '../../types/SearchFormCalendar';

import Calendar from '../Calendar';

import vars from '../../vars';
import i18n from '../../i18n';
import { hexToRgba } from '../../utils';

type TProps = TSearchFormCelendar;

const SearchFormCalendar = ({
  showCalendar,
  selectedDate,
  onDateSelect,
}: TProps) => (
  <Modal animationType="fade" transparent visible={showCalendar} onRequestClose={() => {}}>
    <View style={styles.container}>
      <View style={styles.modalContainer}>
        <Text style={styles.title}>
          {i18n.filters.availableDays}
        </Text>
        <Calendar activeFrom={moment()} selectedDate={selectedDate} onDateSelect={onDateSelect} containerWidth={328} />
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
});
