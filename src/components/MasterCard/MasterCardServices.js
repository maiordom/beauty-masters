// @flow

import isEmpty from 'lodash/isEmpty';
import toUpper from 'lodash/toUpper';

import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Platform,
} from 'react-native';

import vars from '../../vars';
import i18n from '../../i18n';

export default class MasterCardServices extends Component {
  render() {
    const { services } = this.props;

    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>{i18n.myServices}</Text>
        </View>
        {services.map(serviceGroup => (
          <View key={serviceGroup.id}>
            <View style={Platform.OS === 'android' ? styles.service : null}>
              <Text style={styles.serviceGroupTitle}>
                {Platform.OS === 'android' ? serviceGroup.title : toUpper(serviceGroup.title) }
              </Text>
            </View>
            {serviceGroup.services.map(service => (
              <View
                style={styles.service}
                key={service.serviceId}
              >
                <Text style={styles.name}>{service.title}</Text>
                <Text style={styles.price}>
                  <Text>{`${service.price} \u20BD`}</Text>
                  {service.duration > 0 && (
                    <Text>, {service.duration} {i18n.time.minuteShort}.</Text>
                  )}
                </Text>
              </View>
            ))}
          </View>
        ))}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    ...Platform.select({
      android: {
        margin: 16,
        paddingBottom: 16,
        borderBottomWidth: 1,
        borderColor: vars.color.lightGrey,
      },
    }),
  },
  content: {
    alignSelf: 'stretch',
    backgroundColor: vars.color.white,
  },
  title: {
    color: vars.color.black,
    ...Platform.select({
      ios: {
        fontSize: 17,
        fontWeight: '600',
        paddingLeft: 16,
      },
      android: {
        fontSize: 20,
        marginBottom: 16,
      },
    }),
  },
  serviceGroupTitle: {
    ...Platform.select({
      ios: {
        fontSize: 12,
        color: vars.color.grey,
        padding: 16,
      },
    }),
  },
  service: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    ...Platform.select({
      ios: {
        paddingLeft: 16,
        paddingRight: 16,
        paddingBottom: 5,
        paddingTop: 5,
      },
      android: {
        marginBottom: 16,
      },
    }),
  },
  name: {
    flex: 3,
    ...Platform.select({
      ios: {
        fontSize: 13,
        color: vars.color.grey,
      },
    }),
  },
  serviceInfo: {
    flexShrink: 0,
    color: vars.color.black,
    ...Platform.select({
      ios: {
        fontSize: 13,
      },
    }),
  },
});
