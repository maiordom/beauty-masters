// @flow

import React, { Component } from 'react';

import {
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';

import ModalComponent from '../Modal';

import i18n from '../../i18n';
import vars from '../../vars';
import { hexToRgba } from '../../utils';

const icons = {
  info: require('../../icons/info.png'),
  check: require('../../icons/check.png'),
};

export default class MasterCardEquipment extends Component {
  state = {
    showInfo: false,
  };

  onInfoToggle = () => this.setState({ showInfo: !this.state.showInfo });

  render() {
    const { showInfo } = this.state;
    const { services } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>
            {i18n.handlingTool}
          </Text>
          <TouchableOpacity onPress={this.onInfoToggle}>
            <Image source={icons.info} style={styles.info} />
          </TouchableOpacity>
        </View>
        {services.map((service, key) => (
          <View style={styles.equipment} key={key}>
            <Image source={icons.check} style={styles.check} />
            <Text style={styles.name}>{service.title}</Text>
          </View>
        ))}
        <ModalComponent isVisible={showInfo} onRequestClose={this.onInfoToggle}>
          <Text style={styles.modalTitle}>{i18n.handlingTool}</Text>
          <Text style={styles.modalText}>{i18n.sterilization.disinfection}</Text>
          <Text style={styles.modalText}>{i18n.sterilization.glasperlen}</Text>
          <Text style={styles.modalText}>{i18n.sterilization.hotSteam}</Text>
          <Text style={styles.modalText}>{i18n.sterilization.dryhot}</Text>
          <Text style={styles.modalText}>{i18n.sterilization.boiling}</Text>
        </ModalComponent>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginRight: 16,
    marginLeft: 16,
    paddingBottom: 16,
    flex: 1,
    borderBottomWidth: 1,
    borderColor: vars.color.lightGrey,
  },
  content: {
    alignSelf: 'stretch',
    backgroundColor: vars.color.white,
  },
  titleWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    fontSize: 20,
    color: vars.color.black,
  },
  info: {
    height: 24,
    width: 24,
  },
  equipment: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  check: {
    height: 8,
    width: 10,
  },
  name: {
    marginLeft: 6,
  },
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
    marginBottom: 13,
  },
  modalText: {
    fontSize: 16,
    marginBottom: 10,
  },
});
