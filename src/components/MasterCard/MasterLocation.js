// @flow

import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  Text,
  Platform,
  InteractionManager,
} from 'react-native';
import MapView from 'react-native-maps';

// import i18n from '../../i18n';
// import vars from '../../vars';

const icons = Platform.select({
  android: {
    pinRed: require('../../icons/pin-red.png'),
  },
  ios: {},
});

export default class MasterLocation extends Component {
  render() {
    const { latitude, longitude } = this.props;

    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          region={{
            latitude,
            longitude,
            latitudeDelta: 0.04, // 1 delata degree = 111 km, 0.04 = 5km,
            longitudeDelta: 0.04, // 1 delata degree = 111 km, 0.04 = 5km
          }}
        >
          <MapView.Marker
            coordinate={{ latitude, longitude }}
            image={icons.pinRed}
          />
        </MapView>
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
});
