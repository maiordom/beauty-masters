// @flow

import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Platform,
} from 'react-native';
import MapView from 'react-native-maps';

// import i18n from '../../i18n';
import vars from '../../vars';
import MapCard from '../Serp/MapCard';

const icons = Platform.select({
  android: {
    pinRed: require('../../icons/pin-red.png'),
  },
  ios: {},
});

export default class MasterLocation extends Component {
  render() {
    const {
      latlng: { latitude, longitude },
      sceneKey,
      title,
      subtitle,
      address,
      isVerified,
    } = this.props;

    return (
      <View style={styles.container}>
        {sceneKey === 'masterLocation' && (
          <MapView
            style={styles.map}
            region={{
              latitude,
              longitude,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            }}
          >
            <MapView.Marker
              coordinate={{ latitude, longitude }}
              image={icons.pinRed}
            />
          </MapView>
        )}
        <MapCard
          photo="https://unsplash.it/48" // TODO: get it from store of current master
          isVerified={isVerified}
          title={title}
          subtitle={subtitle}
          address={address}
          distance="222" // TODO: get it from navigation
        />
      </View>
    );
  }
}

const NAV_BAR_WIDTH = 78;

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - NAV_BAR_WIDTH,
    justifyContent: 'flex-end',
    alignItems: 'center',
    zIndex: 100,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  snippet: {
    minHeight: 101,
    backgroundColor: vars.color.white,
    alignSelf: 'stretch',
    padding: 16,
  },
  header: {
    marginBottom: 16,
    flexDirection: 'row',
  },
  photo: {
    width: 48,
    height: 48,
    borderRadius: 50,
    marginRight: 8,
  },
  title: {
    fontSize: 16,
    color: vars.color.black,
  },
});
