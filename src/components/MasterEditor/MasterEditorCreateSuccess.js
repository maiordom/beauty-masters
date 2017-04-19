import React, { Component } from 'react';
import { View, StyleSheet, Text, Platform, Image } from 'react-native';

import ButtonControl from '../ButtonControl';

import i18n from '../../i18n';
import vars from '../../vars';

import { shouldComponentUpdate } from '../../utils';

const icons = {
  success: Platform.select({
    android: require('../../icons/android/success.png'),
  }),
};

export default class MasterEditorCreateSuccess extends Component {
  shouldComponentUpdate = shouldComponentUpdate();

  onCompletePress = () => {
    this.props.onNextPress();
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inner}>
          <Image source={icons.success} />
          <Text style={styles.title}>{i18n.registrationComplete.title}</Text>
          <Text style={styles.description}>{i18n.registrationComplete.description}</Text>
        </View>
        <ButtonControl onPress={this.onCompletePress} label={i18n.registrationComplete.ok} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
