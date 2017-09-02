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
import { ButtonPanel } from '../ButtonPanel';

const photoEmpty = require('../../icons/photo-empty.png');

type TProps = {
  actions: Object,
  email: string,
  masterPhotos: Array<string>,
  phone: string,
  username: string,
}

export default class MasterProfileInfo extends Component<TProps, void> {
  onSelectAnotherMaster = () => {
    this.props.actions.selectAnotherMaster();
  };

  render() {
    const {
      masterPhotos,
      username,
      phone,
      email,
    } = this.props;

    const photoSrc = masterPhotos[0] ? { uri: masterPhotos[0] } : photoEmpty;

    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Image style={styles.photo} source={photoSrc} />
          <Text style={styles.edit}>{i18n.editProfile}</Text>
          <View style={styles.inputs}>
            <View style={styles.row}>
              <InputWithLabel
                value={username}
                label={i18n.username}
                style={styles.input}
              />
            </View>
            <View style={styles.row}>
              <InputWithLabel
                value={phone}
                label={i18n.phoneShort}
                style={styles.input}
              />
              <InputWithLabel
                value={email}
                label={i18n.login}
                style={styles.input}
              />
            </View>
            <Text style={styles.changePassword}>{i18n.changePassword}</Text>
          </View>
        </View>
        <ButtonPanel
          onPress={this.onSelectAnotherMaster}
          title={i18n.selectAnotherMaster}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1,
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
    padding: 12,
  },
  input: {
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  changePassword: {
    marginTop: 16,
    marginLeft: 4,
    color: vars.color.black,
    fontSize: 16,
  },
});
