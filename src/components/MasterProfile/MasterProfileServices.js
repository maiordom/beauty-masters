// @flow

import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from 'react-native';

import isEmpty from 'lodash/isEmpty';

import ActivityIndicator from '../../containers/ActivityIndicator';

import i18n from '../../i18n';
import vars from '../../vars';

type TProps = {
  actions: any,
  uploaded: boolean,
  services: Array<any>,
}

export default class MasterProfileServices extends Component<TProps, void> {
  componentDidMount() {
    if (!this.props.uploaded) {
      this.props.actions.getMasterServices();
    }
  }

  render() {
    const { services, uploaded } = this.props;

    if (!uploaded) {
      return (
        <ActivityIndicator
          animating
          position="absolute"
        />
      );
    }

    return (
      <View style={styles.container}>
        <ScrollView style={styles.content}>
          {services.map(serviceGroup => (
            <View key={serviceGroup.id}>
              <View style={styles.serviceTitle}>
                <Text>{serviceGroup.title}</Text>
              </View>
              {serviceGroup.services.map(service => {
                console.log(service, !isEmpty(service.price), !isEmpty(service.duration));
                return (
                  <View style={styles.service} key={service.serviceId + service.categoryId + service.title}>
                    <Text>{service.title}</Text>
                    <Text style={styles.serviceInfo}>
                      {!isEmpty(service.price) && (
                        <Text>{service.price} р</Text>
                      )}
                      {service.duration > 0 && (
                        <Text>, {service.duration} {i18n.time.minuteShort}.</Text>
                      )}
                    </Text>
                  </View>
                );
              })}
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
  serviceInfo: {
    color: vars.color.black,
  },
});
