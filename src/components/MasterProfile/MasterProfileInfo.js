// @flow

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
} from 'react-native';

import i18n from '../../i18n';
import vars from '../../vars';

import InputWithLabel from '../InputWithLabel';

const photoEmpty = require('../../icons/photo-empty.png');

export default class MasterProfileInfo extends Component {
  props: {
    profile: {
      /* eslint-disable */
      masterPhoto: Array<string>,
      firstName: string,
      lastName: string,
      phone: string,
      email: string,
      /* eslint-enable */
    },
  };

  render() {
    const {
      profile: {
        masterPhoto,
        firstName,
        lastName,
        phone,
        email,
      },
    } = this.props;

    const photoSrc = masterPhoto[0] ? { uri: masterPhoto[0] } : photoEmpty;

    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Image style={styles.photo} source={photoSrc} />
          <Text style={styles.edit}>{i18n.editProfile}</Text>
          <View style={styles.inputs}>
            <View style={styles.row}>
              <InputWithLabel
                value={firstName}
                label={i18n.firstName}
                style={{ flex: 1 }}
              />
              <InputWithLabel
                value={lastName}
                label={i18n.lastName}
                style={{ flex: 1 }}
              />
            </View>
            <View style={styles.row}>
              <InputWithLabel
                value={phone}
                label={i18n.phoneShort}
                style={{ flex: 1 }}
              />
              <InputWithLabel
                value={email}
                label={i18n.login}
                style={{ flex: 1 }}
              />
            </View>
            <Text style={styles.changePwd}>{i18n.changePwd}</Text>
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
    borderTopColor: vars.color.borderColorAndroid,
    borderTopWidth: 1,
    borderBottomColor: vars.color.borderColorAndroid,
    borderBottomWidth: 1,
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
