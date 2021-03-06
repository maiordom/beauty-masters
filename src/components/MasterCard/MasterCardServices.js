// @flow

import toUpper from 'lodash/toUpper';

import React, { PureComponent } from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  Platform,
} from 'react-native';

import vars from '../../vars';
import i18n from '../../i18n';

const icons = Platform.select({
  android: {
    homeIcon: require('../../icons/android/home-icon.png'),
  },
  ios: {
    homeIcon: require('../../icons/ios/home-icon.png'),
  },
});

export default class MasterCardServices extends PureComponent {
  render() {
    const { services, homeDepartureService } = this.props;

    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>{i18n.myServices}</Text>
        </View>
        {homeDepartureService && (
          <View style={styles.homeDepartureContainer}>
            <Image source={icons.homeIcon} />
            <Text style={styles.homeDepartureTitle}>{i18n.homeDeparture}</Text>
            <Text style={styles.homeDeparturePrice}>{`+ ${homeDepartureService.price} \u20BD`}</Text>
          </View>
        )}
        {services.map((serviceGroup) => (
          <View key={serviceGroup.id}>
            <View style={Platform.OS === 'android' ? styles.service : null}>
              <Text style={styles.serviceGroupTitle}>
                {Platform.OS === 'android' ? serviceGroup.title : toUpper(serviceGroup.title) }
              </Text>
            </View>
            {serviceGroup.services.map((subGroup) => (
              <View key={subGroup.id}>
                <View style={styles.serviceSubGroup}>
                  <Text style={styles.serviceSubGroupText}>{subGroup.title}</Text>
                </View>
                {subGroup.services.map((service) => (
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
        ))}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 16,
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
  homeDepartureContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 8,
      },
      android: {
        marginTop: -6,
        marginBottom: 10,
      },
    }),
  },
  homeDepartureTitle: {
    fontSize: 14,
    color: vars.color.grey,
    flex: 1,
    marginLeft: 6,
  },
  homeDeparturePrice: {
    fontSize: 14,
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
      android: {
        color: vars.color.black,
        fontSize: 15,
      },
      ios: {
        fontSize: 12,
        color: vars.color.grey,
        padding: 16,
        paddingBottom: 5,
      },
    }),
  },
  serviceSubGroup: {
    marginTop: 5,
    marginBottom: 10,
    ...Platform.select({
      ios: {
        paddingLeft: 16,
      },
    }),
  },
  serviceSubGroupText: {
    ...Platform.select({
      android: {
        fontSize: 15,
        color: vars.color.black,
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
        paddingBottom: 10,
        paddingTop: 5,
      },
      android: {
        marginBottom: 10,
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
