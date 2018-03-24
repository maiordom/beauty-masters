// @flow

import React, { PureComponent } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { toPattern } from 'vanilla-masker';

import i18n from '../../../i18n';
import vars from '../../../vars';

import { ButtonPanel } from '../../ButtonPanel';

import { TMasterProfileInfoProps } from './MasterProfileInfo.types';

const photoEmpty = require('../../../icons/photo-empty.png');

type TProps = TMasterProfileInfoProps;

export default class MasterProfileInfo extends PureComponent<TProps, void> {
  onSelectAnotherMaster = () => {
    this.props.actions.selectAnotherMaster();
  };

  onEditPress = () => {
    this.props.actions.routeToEdit();
  };

  onResetPasswordPress = () => {
    this.props.actions.routeToRecoverPassword();
  };

  render() {
    const {
      avatar,
      email,
      phone,
      username,
    } = this.props;

    const avatarSource = avatar ? { uri: avatar } : photoEmpty;

    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Image style={styles.photo} source={avatarSource} />
          <TouchableOpacity onPress={this.onEditPress}>
            <View>
              <Text style={styles.edit}>{i18n.editProfile}</Text>
            </View>
          </TouchableOpacity>
          <View style={styles.inputs}>
            <View style={styles.row}>
              <View style={styles.label}>
                <Text style={styles.labelText}>{i18n.username}</Text>
                <Text style={styles.labelValue}>{username}</Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.label}>
                <Text style={styles.labelText}>{i18n.phoneShort}</Text>
                <Text style={styles.labelValue}>{toPattern(phone, { pattern: '+9 (999) 999 99 99' })}</Text>
              </View>
              <View style={styles.label}>
                <Text style={styles.labelText}>{i18n.email}</Text>
                <Text style={styles.labelValue}>{email}</Text>
              </View>
            </View>
            <TouchableOpacity onPress={this.onResetPasswordPress}>
              <View>
                <Text style={styles.resetPassword}>{i18n.resetPassword}</Text>
              </View>
            </TouchableOpacity>
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
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  resetPassword: {
    marginLeft: 4,
    color: vars.color.black,
    fontSize: 16,
  },
  label: {
    paddingLeft: 4,
    paddingRight: 4,
  },
  labelText: {
    fontSize: 12,
    color: vars.color.grey,
    marginBottom: 5,
  },
  labelValue: {
    fontSize: 16,
    color: vars.color.black,
  },
});
