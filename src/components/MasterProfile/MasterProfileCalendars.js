// @flow

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { Actions } from 'react-native-router-flux';

import i18n from '../../i18n';
import vars from '../../vars';

export default class MasterProfileCalendars extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.subtitle}>{i18n.chooseAddress}</Text>
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => Actions.masterProfileCalendar({ title: 'Пилки' })}
          >
            <View style={styles.salon}>
              <Text style={styles.salonTitle}>Пилки</Text>
            </View>
          </TouchableOpacity>
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
  subtitle: {
    padding: 16,
    borderBottomWidth: 1,
    borderColor: vars.color.borderColorAndroid,
  },
  salon: {
    height: 50,
    backgroundColor: vars.color.white,
    paddingTop: 15,
    paddingLeft: 16,
    borderBottomWidth: 1,
    borderColor: vars.color.borderColorAndroid,
  },
  salonTitle: {
    color: vars.color.black,
    fontSize: 16,
  },
});
