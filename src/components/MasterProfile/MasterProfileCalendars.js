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

type TProps = {
  addresses: Array<{
    id: number,
    name: string,
  }>
}

export default class MasterProfileCalendars extends Component<TProps, void> {
  render() {
    const { addresses } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.subtitle}>{i18n.chooseAddress}</Text>
          {addresses.map(({ id, name }) => (
            <TouchableOpacity
              key={id}
              activeOpacity={1}
              onPress={() => Actions.masterProfileCalendar({ title: name, id })}
            >
              <View style={styles.address}>
                <Text style={styles.addressTitle}>{name}</Text>
              </View>
            </TouchableOpacity>
          ))}
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
  address: {
    height: 50,
    backgroundColor: vars.color.white,
    paddingTop: 15,
    paddingLeft: 16,
    borderBottomWidth: 1,
    borderColor: vars.color.borderColorAndroid,
  },
  addressTitle: {
    color: vars.color.black,
    fontSize: 16,
  },
});
