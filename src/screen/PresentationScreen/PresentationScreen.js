import React, { Component } from 'react';
import { Text, View, StyleSheet, Image, TouchableHighlight } from 'react-native';

import i18n from '../../i18n';

export default class PresentationScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.logo}source={require('./icons/logo@2x.png')} />
        <Text style={styles.title}>{i18n.presentation.title}</Text>
        <View style={styles.list}>
          <View style={styles.listItem}>
            <Image source={require('./icons/pin.png')} />
            <Text style={styles.text}>{i18n.presentation.pin}</Text>
          </View>
          <View style={styles.listItem}>
            <Image source={require('./icons/list.png')} />
            <Text style={styles.text}>{i18n.presentation.list}</Text>
          </View>
          <View style={styles.listItem}>
            <Image source={require('./icons/photo.png')} />
            <Text style={styles.text}>{i18n.presentation.photo}</Text>
          </View>
          <View style={styles.listItem}>
            <Image source={require('./icons/calendar.png')} />
            <Text style={styles.text}>{i18n.presentation.calendar}</Text>
          </View>
        </View>
        <TouchableHighlight style={styles.continue}>
          <Text style={styles.continueText}>{i18n.continue}</Text>
        </TouchableHighlight>
        <Text style={styles.auth}>{i18n.authAsMaster}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f65f6e',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 15,
    paddingRight: 15
  },
  logo: {
    marginBottom: 17
  },
  title: {
    width: 290,
    fontSize: 17,
    marginBottom: 15,
    color: '#fff'
  },
  text: {
    color: '#fff',
    marginLeft: 15
  },
  listItem: {
    marginTop: 15,
    flexDirection: 'row',
    alignItems: 'center'
  },
  list: {
    marginBottom: 30
  },
  continue: {
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    borderRadius: 22,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18
  },
  continueText: {
    color: '#F65F6E',
    fontSize: 17
  },
  auth: {
    color: '#fff',
    fontSize: 17
  }
});
