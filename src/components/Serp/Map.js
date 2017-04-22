// @flow

import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import MapView from 'react-native-maps';

import MapMarker from './MapMarker';
import SerpSnippet from './SerpSnippet';

import vars from '../../vars';
import i18n from '../../i18n';

type LatLngType = {
  latitude: number,
  longitude: number,
}

type RegionType = {
  latitude: number,
  longitude: number,
  latitudeDelta: number,
  longitudeDelta: number,
}

type MarkerType = {
  latlng: LatLngType,
  title?: string,
  description?: string
}

const markers : Array<MarkerType> = [
  { latlng: { latitude: 60.000316, longitude: 30.256373 } },
  { latlng: { latitude: 60.001496, longitude: 30.250600 } },
  { latlng: { latitude: 60.002007, longitude: 30.254395 } },
];

type State = {
  showSnippet: boolean,
  region: RegionType,
}

export default class Map extends Component<void, void, State> {
  map: MapView;

  setMapRef = (ref: MapView) => {
    this.map = ref;
  };

  onMarkerPress = (event : any) => {
    console.log(event.nativeEvent);
    this.setState({ showSnippet: true });
  };

  onMapPress = () => {
    this.setState({ showSnippet: false });
  };

  onLocationPress = () => {
    this.map.animateToRegion(this.state.region, 300);
  };

  state = {
    showSnippet: false,
    region: {
      latitude: 60.000316,
      longitude: 30.256373,
      latitudeDelta: 0.015,
      longitudeDelta: 0.0121,
    },
  };

  render() {
    const { region, showSnippet } = this.state;

    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          onPress={this.onMapPress}
          region={region}
          showsCompass={false}
          ref={this.setMapRef}
        >
          {markers.map(marker => (
            <MapView.Marker
              coordinate={marker.latlng}
              key={marker.latlng.latitude + marker.latlng.longitude}
              onPress={this.onMarkerPress}
            >
              <MapMarker />
            </MapView.Marker>
          ))}
        </MapView>
        <View style={styles.filterButtonWrapper}>
          <View style={styles.filterButton}>
            <Image source={require('../../icons/filter.png')} />
            <Text style={styles.filterText}>
              {i18n.filter}
            </Text>
          </View>
        </View>
        <TouchableOpacity style={styles.locationButtonWrapper} onPress={this.onLocationPress}>
          <View style={styles.locationButton}>
            <Image source={require('../../icons/location.png')} />
          </View>
        </TouchableOpacity>
        {showSnippet && <SerpSnippet />}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height - 78,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  filterButtonWrapper: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterButton: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    width: 120,
    height: 40,
    backgroundColor: vars.color.white,
    borderRadius: 50,
  },
  filterText: {
    marginLeft: 8,
    color: vars.color.red,
  },
  locationButtonWrapper: {
    position: 'absolute',
    right: 16,
    bottom: 16,
  },
  locationButton: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: vars.color.white,
    borderRadius: 50,
    height: 40,
    width: 40,
  },
});
