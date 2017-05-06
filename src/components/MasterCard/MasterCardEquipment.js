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

import vars from '../../vars';
import { hexToRgba } from '../../utils';

export default class MasterCardEquipment extends Component {
  state = {
    showInfo: false,
  };

  onInfoToggle = () => this.setState({ showInfo: !this.state.showInfo });

  render() {
    const { showInfo } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.titleWrapper}>
          <Text style={styles.title}>Обработка инструмента</Text>
          <TouchableOpacity onPress={this.onInfoToggle}>
            <Image
              source={require('../../icons/info.png')}
              style={styles.info}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.equipment}><Text>Дезинфекция</Text></View>
        <View style={styles.equipment}>
          <Image source={require('../../icons/check.png')} style={styles.check} />
          <Text style={styles.name}>Ультразвук</Text>
        </View>
        <View style={styles.equipment}>
          <Image source={require('../../icons/check.png')} style={styles.check} />
          <Text style={styles.name}>Ультрафиолет</Text>
        </View>
        <ModalComponent
          isVisible={showInfo}
          onRequestClose={this.onInfoToggle}
        >
          <Text style={styles.modalTitle}>Обработка инструмента</Text>
          <Text>
            Ультразвук, Ультрафиолет, Дезинфекция раствором спиртом
            Устраняет грибковую и бактериальную флору

            Гласперленовый стерилизатор
            Стерилизация в специальном аппарате под воздействием высокой температуры
          </Text>
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
  },
  title: {
    fontSize: 20,
    color: vars.color.black,
    marginBottom: 16,
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
  },
});
