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
          <View style={styles.sectionContainer}>
            <View style={styles.row}>
              <View style={styles.label}>
                <Text style={styles.labelValue}>{username}</Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.label}>
                <Text style={styles.labelValue}>{toPattern(phone, { pattern: '+9 (999) 999 99 99' })}</Text>
              </View>
            </View>
            <View style={styles.row}>
              <View style={styles.label}>
                <Text style={styles.labelValue}>{email}</Text>
              </View>
            </View>
            <TouchableOpacity onPress={this.onResetPasswordPress}>
              <View style={styles.buttonContainerRow}>
                <Text style={styles.actionLabel}>{i18n.resetPassword}</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.sectionContainer}>
            <TouchableOpacity onPress={this.onSelectAnotherMaster}>
              <View style={styles.buttonContainerRow}>
                <Text style={styles.actionLabel}>{i18n.selectAnotherMaster}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  actionLabel: {
    color: vars.color.red,
    fontSize: 17,
  },
  buttonContainerRow: {
    justifyContent: 'center',
    height: 44,
  },
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
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  row: {
    height: 44,
    borderBottomColor: vars.color.cellSeparatorColorIOS,
    borderBottomWidth: 1,
  },
  sectionContainer: {
    marginTop: 16,
    borderTopColor: vars.color.cellSeparatorColorIOS,
    borderTopWidth: 1,
    borderBottomColor: vars.color.cellSeparatorColorIOS,
    borderBottomWidth: 1,
    backgroundColor: vars.color.white,
    paddingLeft: 16,
  },
  label: {
    flex: 1,
    justifyContent: 'center',
  },
  labelValue: {
    fontSize: 17,
    color: vars.color.black,
  },
});
