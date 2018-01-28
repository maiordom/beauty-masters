import React, { Component } from 'react';
import { View, StyleSheet, Text, Platform, Image, TouchableOpacity } from 'react-native';

import toUpper from 'lodash/toUpper';

import ButtonControl from '../ButtonControl';

import i18n from '../../i18n';
import vars from '../../vars';

import { shouldComponentUpdate } from '../../utils';

import { MASTER_CARD_STATUS } from '../../constants/Master';
import { TCreateMaster } from '../../types/CreateMaster';

import { trackEvent } from '../../utils/Tracker';

const icons = {
  success: Platform.select({
    android: require('../../icons/android/success.png'),
  }),
};

type TProps = {
  actions: {
    createMaster: (createMasterQuery: TCreateMaster) => Promise<any>,
    routeToPresentation: () => void,
    routeToCreateMasterCard: () => void,
    refreshEditor: () => void,
  },
  isSalon: boolean,
};

export default class MasterEditorCreateSuccess extends Component<void, TProps> {
  shouldComponentUpdate = shouldComponentUpdate();

  onCompletePress = () => {
    this.props.actions.createMaster({ status: MASTER_CARD_STATUS.MODERATION }).then(() => {
      if (this.props.isSalon) {
        trackEvent('step6Salon');
        trackEvent('step6SalonSuccess');
      } else {
        trackEvent('step6Private');
        trackEvent('step6PrivateSuccess');
      }

      this.props.actions.routeToPresentation();
    });
  };

  onAddCardPress = () => {
    this.props.actions.createMaster({ status: MASTER_CARD_STATUS.MODERATION }).then(() => {
      if (this.props.isSalon) {
        trackEvent('step6Salon');
        trackEvent('step6SalonSuccess');
      } else {
        trackEvent('step6Private');
        trackEvent('step6PrivateSuccess');
      }

      this.props.actions.refreshEditor();
      this.props.actions.routeToCreateMasterCard();
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inner}>
          <Image source={icons.success} />
          <Text style={styles.title}>
            {i18n.registrationComplete.title}
          </Text>
          <Text style={styles.description}>
            {i18n.registrationComplete.description}
          </Text>
        </View>
        <ButtonControl
          onPress={this.onCompletePress}
          label={i18n.registrationComplete.ok}
        />
        <TouchableOpacity style={styles.addCardTouchable} onPress={this.onAddCardPress}>
          <Text style={styles.addCardTitle}>
            {Platform.select({
              android: toUpper(i18n.registrationComplete.addCard),
              ios: i18n.registrationComplete.addCard,
            })}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  addCardTouchable: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 16,
    paddingBottom: 16,
    ...Platform.select({
      android: {
        borderTopWidth: 1,
        borderTopColor: vars.color.borderColorAndroid,
      },
    }),
  },
  addCardTitle: {
    color: vars.color.red,
    ...Platform.select({
      android: {
        fontSize: 14,
        fontWeight: '600',
        textDecorationLine: 'underline',
      },
    }),
  },
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 16,
    marginRight: 16,
  },
  title: {
    fontSize: 16,
    color: vars.color.black,
    marginTop: 32,
    marginBottom: 6,
  },
  description: {
    textAlign: 'center',
    fontSize: 14,
    color: vars.color.grey,
    lineHeight: 20,
  },
});
