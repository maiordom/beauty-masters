// @flow

import React, { PureComponent } from 'react';
import {
  Platform,
  StyleSheet,
  View,
} from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

import vars from '../../vars';
import MapCard from '../Serp/MapCard';
import getDistance from '../../utils/Geo';

const icons = Platform.select({
  android: {
    pinRed: require('../../icons/pin-red.png'),
  },
  ios: {
    pinRed: require('../../icons/ios/pin-red.png'),
  },
});

export default class MasterLocation extends PureComponent {
  constructor(props) {
    super(props);

    const { initialRegion, location } = props;

    this.state = {
      distance: getDistance(
        location.lat,
        location.lng,
        initialRegion.latitude,
        initialRegion.longitude,
      ).toFixed(2),
    };
  }

  render() {
    const {
      address,
      isSalon,
      location: { lat, lng },
      photo,
      sceneKey,
      username,
    } = this.props;

    const { distance } = this.state;

    return (
      <View style={styles.container}>
        {sceneKey === 'masterLocation' && (
          <MapView
            style={styles.map}
            provider={PROVIDER_GOOGLE}
            region={{
              latitude: lat,
              longitude: lng,
              latitudeDelta: 0.005,
              longitudeDelta: 0.005,
            }}
          >
            <MapView.Marker
              coordinate={{ latitude: lat, longitude: lng }}
              image={icons.pinRed}
            />
          </MapView>
        )}
        <MapCard
          address={address}
          distance={distance}
          isSalon={isSalon}
          photo={photo}
          username={username}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    zIndex: 100,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  snippet: {
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
