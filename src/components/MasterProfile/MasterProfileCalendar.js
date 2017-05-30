// @flow

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  Modal,
  TouchableOpacity,
} from 'react-native';
import moment from 'moment';

import Calendar from '../Calendar';
import Switch from '../Switch';

import { hexToRgba } from '../../utils';

import i18n from '../../i18n';
import vars from '../../vars';

export default class MasterProfileCalendar extends Component {
  static propTypes = {};

  state = {
    showDeactivateModal: false,
    isDisabled: false,
  };

  onSwitchToggle = (value: boolean) => {
    this.setState({ showDeactivateModal: !this.state.showDeactivateModal });
  };

  render() {
    const {
      showDeactivateModal,
      isDisabled,
    } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.subtitle}>Расписание</Text>
          <View style={styles.calendar}>
            <Calendar selectedDate={moment().format('YYYY-MM-DD')} />
          </View>
          <View style={styles.salon}>
            <Text style={styles.salonText}>Принимаю с 13:00 до 18:00</Text>
            <Text style={styles.salonText}>Салон «Пилки»</Text>
            <Text style={styles.salonText}>По адресу Ленинский пр., д. 127</Text>
          </View>
          <Switch
            title="Временно не работаю"
            customStyles={{ container: styles.switchContainer }}
            onChange={this.onSwitchToggle}
            value={isDisabled}
          />
        </View>
        <Modal
          animationType={'fade'}
          transparent
          visible={showDeactivateModal}
          onRequestClose={() => {}}
        >
          <View style={styles.modalWrapper}>
            <View style={styles.modalContainer}>
              <Text style={styles.modalTitle}>Деактивировать профиль</Text>
              <Text style={styles.modalText}>{i18n.deactivate}</Text>
              <View style={styles.modalButtons}>
                <TouchableOpacity>
                  <Text style={styles.modalButton}>Да</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={styles.modalButton}>Отмена</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  content: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: vars.color.lightGrey,
  },
  subtitle: {
    padding: 16,
  },
  calendar: {
    backgroundColor: vars.color.white,
  },
  salon: {
    padding: 16,
  },
  salonText: {
    color: vars.color.black,
  },
  switchContainer: {
    paddingLeft: 15,
    backgroundColor: vars.color.white,
    justifyContent: 'space-between',
    height: 44,
    paddingRight: 8,
    ...Platform.select({
      android: {
        height: 48,
        borderBottomColor: vars.color.borderColorAndroid,
        borderBottomWidth: 1,
        borderTopColor: vars.color.borderColorAndroid,
        borderTopWidth: 1,
      },
    }),
  },
  modalWrapper: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: hexToRgba(vars.color.black, 40),
  },
  modalContainer: {
    marginLeft: 30,
    marginRight: 30,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: vars.color.white,
    borderRadius: 2,
    padding: 24,
  },
  modalTitle: {
    fontSize: 18,
    color: vars.color.black,
    marginBottom: 13,
  },
  modalText: {
    fontSize: 16,
    lineHeight: 24,
  },
  modalButtons: {
    alignSelf: 'stretch',
    flexDirection: 'row',
  },
  modalButton: {
    color: vars.color.red,
    fontSize: 18,
    marginLeft: 5,
  },
});
