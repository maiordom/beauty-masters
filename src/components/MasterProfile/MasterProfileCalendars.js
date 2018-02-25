// @flow

import React, { PureComponent } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';

import { Actions } from 'react-native-router-flux';

import ActivityIndicator from '../../containers/ActivityIndicator';

import i18n from '../../i18n';
import vars from '../../vars';

type TProps = {
  actions: any,
  addresses: Array<{
    id: number,
    name: string,
  }>,
  uploaded: boolean,
}

export default class MasterProfileCalendars extends PureComponent<TProps, void> {
  componentDidMount() {
    this.props.actions.getAddresses();
  }

  render() {
    const { addresses = [], uploaded } = this.props;

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
        {!uploaded && (
          <ActivityIndicator
            animating
            position="absolute"
          />
        )}
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
