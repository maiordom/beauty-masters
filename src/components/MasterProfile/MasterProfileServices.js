// @flow

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';

import i18n from '../../i18n';
import vars from '../../vars';

type Props = {
  services: Array<{
    title: string,
    id: number,
    services: Array<{
      price: number,
      duration: string,
      title: string,
      serviceId: number,
    }>
  }>
}
export default class MasterProfileServices extends Component<void, Props, void> {
  render() {
    const { services } = this.props;

    return (
      <View style={styles.container}>
        <ScrollView style={styles.content}>
          {services.map(serviceGroup => (
            <View key={serviceGroup.id}>
              <View style={styles.serviceTitle}>
                <Text>{serviceGroup.title}</Text>
              </View>
              {serviceGroup.services.map(service => (
                <View style={styles.service} key={service.serviceId}>
                  <Text>{service.title}</Text>
                  <Text style={styles.price}>
                    {service.price} р, {service.duration} {i18n.time.minuteShort}.
                  </Text>
                </View>
              ))}
            </View>
          ))}
        </ScrollView>
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
  serviceTitle: {
    padding: 16,
  },
  service: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 8,
    paddingBottom: 8,
    backgroundColor: vars.color.white,
  },
  price: {
    color: vars.color.black,
  },
});
