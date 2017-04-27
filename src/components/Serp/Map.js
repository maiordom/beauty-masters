// @flow

import React, { Component } from 'react';
import {
  View,
  Text,
  Image,
  Animated,
  StyleSheet,
  Dimensions,
  PanResponder,
  TouchableOpacity,
  InteractionManager,
} from 'react-native';
import MapView from 'react-native-maps';
import { Actions } from 'react-native-router-flux';
import isEqual from 'lodash/isEqual';

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
  renderLoader: boolean,
  showSnippet: boolean,
  region: RegionType,
  initialRegion: RegionType,
  snippetTranslateY: Animated.Value,
  activePin: ?LatLngType
}

const SNIPPET_HEIGHT = 204;

export default class Map extends Component<void, void, State> {
  state = {
    renderLoader: true,
    showSnippet: false,
    initialRegion: {
      latitude: 60.000316,
      longitude: 30.256373,
      latitudeDelta: 0.04, // 1 delata degree = 111 km, 0.04 = 5km
      longitudeDelta: 0.04,
    },
    region: {
      latitude: 60.000316,
      longitude: 30.256373,
      latitudeDelta: 0.04, // 1 delata degree = 111 km, 0.04 = 5km
      longitudeDelta: 0.04,
    },
    snippetTranslateY: new Animated.Value(SNIPPET_HEIGHT),
    activePin: null,
  };

  map: MapView;

  snippetPanResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponderCapture: () => true,
    onPanResponderMove: (evt, gestureState) => {
      if (gestureState.dy < 0) { // user swipes up
        return;
      }
      return gestureState.dy > 0 && Animated.event([null, { dy: this.state.snippetTranslateY }])(evt, gestureState);
    },
    onPanResponderRelease: (evt, gestureState) => {
      if (gestureState.dy > 70) {
        Animated.timing(this.state.snippetTranslateY, { toValue: SNIPPET_HEIGHT, duration: 500 }).start();
      } else {
        Animated.timing(this.state.snippetTranslateY, { toValue: 0, duration: 500 }).start();
      }
    },
  });

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({ renderLoader: false });
    });
  }

  setMapRef = (ref: MapView) => {
    this.map = ref;
  };

  onMarkerPress = (event: any) => {
    const { coordinate } = event.nativeEvent;
    const region = { ...coordinate, latitudeDelta: 0.005, longitudeDelta: 0.005 };

    this.map.animateToRegion(region, 600);
    this.setState({ activePin: coordinate, region });

    Animated.timing(this.state.snippetTranslateY, { toValue: 0, duration: 200 }).start();
  };

  onMapPress = () => {
    this.setState({ activePin: null, region: this.state.initialRegion });

    Animated.timing(this.state.snippetTranslateY, { toValue: SNIPPET_HEIGHT, duration: 500 }).start();
  };

  onLocationPress = () => {
    this.map.animateToRegion(this.state.initialRegion, 300);
  };

  render() {
    const { region, activePin, renderLoader } = this.state;

    if (renderLoader) {
      return null;
    }

    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          onPress={this.onMapPress}
          initialRegion={region}
          ref={this.setMapRef}
        >
          {markers.map(marker => (
            <MapView.Marker
              coordinate={marker.latlng}
              key={marker.latlng.latitude + marker.latlng.longitude}
              onPress={this.onMarkerPress}
              image={isEqual(marker.latlng, activePin)
                ? require('../../icons/pin-green.png')
                : require('../../icons/pin-red.png')
              }
            />
          ))}
        </MapView>
        <TouchableOpacity
          style={styles.filterButtonWrapper}
          onPress={Actions.pop}
        >
          <View style={styles.filterButton}>
            <Image source={require('../../icons/filter.png')} />
            <Text style={styles.filterText}>
              {i18n.filter}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.locationButtonWrapper} onPress={this.onLocationPress}>
          <View style={styles.locationButton}>
            <Image source={require('../../icons/location.png')} />
          </View>
        </TouchableOpacity>
        <Animated.View
          style={{
            position: 'absolute',
            bottom: 0,
            transform: [{ translateY: this.state.snippetTranslateY }],
          }}
          {...this.snippetPanResponder.panHandlers}
        >
          <SerpSnippet />
        </Animated.View>
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
