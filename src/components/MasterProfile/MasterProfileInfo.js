// @flow

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Platform,
  Image,
  Modal,
  TouchableOpacity,
} from 'react-native';
// import moment from 'moment';

import { hexToRgba } from '../../utils';

// import i18n from '../../i18n';
import vars from '../../vars';

import InputWithLabel from '../InputWithLabel';

export default class MasterProfileInfo extends Component {
  static propTypes = {};

  render() {
    const {
      masterPhoto,
      firstName,
      lastName,
      phone,
    } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Image style={styles.photo} source={{ uri: masterPhoto[0] }} />
          <Text style={styles.edit}>Редактировать данные профиля</Text>
          <View style={styles.inputs}>
            <View style={styles.row}>
              <InputWithLabel
                value={firstName}
                label="Имя"
                style={{ flex: 1 }}
                editable={false}
              />
              <InputWithLabel
                value={lastName}
                label="Фамилия"
                style={{ flex: 1 }}
                editable={false}
              />
            </View>
            <View style={styles.row}>
              <InputWithLabel
                value={phone}
                label="Телефон"
                style={{ flex: 1 }}
                editable={false}
              />
              <InputWithLabel
                value="hello@ya.ru"
                label="Логин"
                style={{ flex: 1 }}
                editable={false}
              />
            </View>
            <Text style={styles.changePwd}>Изменить пароль</Text>
          </View>
        </View>
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
  photo: {
    alignSelf: 'center',
    marginTop: 16,
    marginBottom: 16,
    width: 80,
    height: 80,
    borderRadius: 50,
  },
  edit: {
    marginLeft: 16,
    marginBottom: 16,
  },
  inputs: {
    backgroundColor: vars.color.white,
    padding: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  changePwd: {
    marginTop: 16,
    color: vars.color.black,
    fontSize: 16,
  },
});
