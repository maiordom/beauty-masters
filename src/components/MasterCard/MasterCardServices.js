// @flow

import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  InteractionManager,
} from 'react-native';

import vars from '../../vars';
import i18n from '../../i18n';

export default class MasterCardServices extends Component {
  state = {
    renderLoader: true,
  };

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({ renderLoader: false });
    });
  }

  render() {
    const { services } = this.props;
    const { renderLoader } = this.state;

    if (renderLoader) {
      return null;
    }

    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>{i18n.myServices}</Text>
        </View>
        {services.map(serviceGroup => (
          <View key={serviceGroup.id}>
            <View style={styles.service}><Text>{serviceGroup.title}</Text></View>
            {serviceGroup.services.map(service => (
              <View style={styles.service} key={service.serviceId}>
                <Text style={styles.name}>{service.title}</Text>
                <Text style={styles.price}>{service.price} ₽, {service.duration} мин</Text>
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
    margin: 16,
    paddingBottom: 16,
    flex: 1,
    borderBottomWidth: 1,
    borderColor: vars.color.lightGrey,
  },
  content: {
    alignSelf: 'stretch',
    backgroundColor: vars.color.white,
  },
  title: {
    fontSize: 20,
    color: vars.color.black,
    marginBottom: 16,
  },
  service: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  name: {
    flex: 3,
  },
  price: {
    flexShrink: 0,
    color: vars.color.black,
  },
});
