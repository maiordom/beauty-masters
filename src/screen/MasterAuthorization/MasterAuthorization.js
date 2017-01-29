import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableHighlight } from 'react-native';

import { Actions } from 'react-native-router-flux';

import i18n from '../../i18n';
import vars from '../../vars';

export default class MasterAuthorization extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.navBar}>
          <TouchableHighlight style={styles.close} onPress={Actions.presentation}>
            <Image source={require('../../components/icons/close.png')} />
          </TouchableHighlight>
          <Text style={styles.navTitle}>{i18n.masterAuthorization}</Text>
        </View>
        <Image style={styles.logo} source={require('../../components/icons/logo.png')} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: vars.bodyColor,
    alignItems: 'center'
  },
  navBar: {
    marginTop: 20,
    height: 40,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  navTitle: {
    color: vars.color.white,
    fontSize: 17
  },
  close: {
    position: 'absolute',
    left: 15,
    top: 13
  },
  logo: {
    marginTop: 56,
    marginBottom: 56
  }
});
