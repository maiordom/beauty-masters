// @flow

import React, { Component } from 'react';

import {
  View,
  StyleSheet,
  Button,
  Text,
  Image,
  TouchableOpacity,
  Platform,
} from 'react-native';

import join from 'lodash/join';

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
          <View style={styles.descriptionsContainer}>
            <Text style={styles.descriptionTitle}>{join([
              i18n.handlingToolMethods.ultrasound,
              i18n.handlingToolMethods.ultraviolet,
              i18n.handlingToolMethods.disinfectionWithAlcohol], ', ')}</Text>
            <Text style={styles.descriptionText}>{i18n.sterilization.disinfection}</Text>
            <Text style={styles.descriptionTitle}>{i18n.handlingToolMethods.glasperlenovySterilizer}</Text>
            <Text style={styles.descriptionText}>{i18n.sterilization.glasperlen}</Text>
            <Text style={styles.descriptionTitle}>{i18n.handlingToolMethods.hotSteam}</Text>
            <Text style={styles.descriptionText}>{i18n.sterilization.hotSteam}</Text>
            <Text style={styles.descriptionTitle}>{i18n.handlingToolMethods.dryHeatMethod}</Text>
            <Text style={styles.descriptionText}>{i18n.sterilization.dryhot}</Text>
            <Text style={styles.descriptionTitle}>{i18n.handlingToolMethods.boiling}</Text>
            <Text style={styles.descriptionText}>{i18n.sterilization.boiling}</Text>
          </View>
          {Platform.OS === 'ios' && <Button
            style={styles.closeButton}
            onPress={this.onInfoToggle}
            title={i18n.masterCard.ok}
            color={vars.color.buttonBlue}
          />}
        </ModalComponent>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  check: {
    height: 8,
    width: 10,
  },
  closeButton: {
    flex: 1,
    padding: 12,
  },
  container: {
    flex: 1,
    ...Platform.select({
      android: {
        borderBottomWidth: 1,
        borderColor: vars.color.lightGrey,
        marginRight: 16,
        marginLeft: 16,
        paddingBottom: 16,
      },
      ios: {
        paddingTop: 30,
      },
    }),
  },
  descriptionsContainer: {
    ...Platform.select({
      ios: {
        paddingRight: 15,
        paddingLeft: 15,
        borderBottomWidth: 1,
        borderColor: vars.color.darkGrey,
      },
    }),
  },
  descriptionText: {
    marginBottom: 10,
    ...Platform.select({
      android: {
        fontSize: 16,
      },
      ios: {
        fontSize: 13,
      },
    }),
  },
  descriptionTitle: {
    ...Platform.select({
      ios: {
        fontSize: 14,
        fontWeight: '600',
      },
    }),
  },
  equipment: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 5,
        paddingBottom: 5,
      },
      android: {
        marginBottom: 16,
      },
    }),
  },
  info: {
    ...Platform.select({
      ios: {
        height: 20,
        width: 20,
      },
      android: {
        height: 24,
        width: 24,
      },
    }),
  },
  modalTitle: {
    color: vars.color.black,
    ...Platform.select({
      ios: {
        fontSize: 17,
        alignSelf: 'center',
        paddingTop: 20,
        paddingLeft: 15,
        paddingRight: 15,
        marginBottom: 13,
      },
      android: {
        fontSize: 20,
        marginBottom: 10,
      },
    }),
  },
  name: {
    marginLeft: 6,
    ...Platform.select({
      ios: {
        color: vars.color.grey,
      },
    }),
  },
  title: {
    color: vars.color.black,
    ...Platform.select({
      ios: {
        fontSize: 17,
        fontWeight: '600',
      },
      android: {
        fontSize: 20,
      },
    }),
  },
  titleWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        paddingLeft: 16,
        paddingRight: 16,
        paddingBottom: 16,
      },
      android: {
        marginBottom: 16,
      },
    }),
  },
});
