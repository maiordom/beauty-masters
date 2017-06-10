// @flow

import React, { Component } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  InteractionManager,
  PanResponder,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import MapView from 'react-native-maps';
import { Actions } from 'react-native-router-flux';
import isEqual from 'lodash/isEqual';

import MapCard from './MapCard';

import vars from '../../vars';
import i18n from '../../i18n';

import type { MapCardType } from '../../types/MasterTypes';

const icons = Platform.select({
  android: {
    filter: require('../../icons/filter.png'),
    location: require('../../icons/location.png'),
    pinGreen: require('../../icons/pin-green.png'),
    pinRed: require('../../icons/pin-red.png'),
  },
  ios: {},
});

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

type State = {
  renderLoader: boolean,
  showSnippet: boolean,
  region: RegionType,
  initialRegion: RegionType,
  snippetTranslateY: Animated.Value,
  activePin: ?LatLngType,
  activePoint: ?MapCardType,
}

type Props = {
  points: Array<MapCardType>,
  sceneKey: string,
  actions: {
    searchMasters: Function,
  },
};

const SNIPPET_HEIGHT = 204;

const initialRegion = [55.76, 37.64];

export default class Map extends Component<void, Props, State> {
  state = {
    renderLoader: true,
    showSnippet: false,
    initialRegion: {
      latitude: initialRegion[0],
      longitude: initialRegion[1],
      latitudeDelta: 0.04, // 1 delata degree = 111 km, 0.04 = 5km
      longitudeDelta: 0.04,
    },
    region: {
      latitude: initialRegion[0],
      longitude: initialRegion[1],
      latitudeDelta: 0.04, // 1 delata degree = 111 km, 0.04 = 5km
      longitudeDelta: 0.04,
    },
    snippetTranslateY: new Animated.Value(SNIPPET_HEIGHT),
    activePin: null,
    activePoint: null,
  };

  map: MapView;

  snippetPanResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (_, gestureState) => gestureState.dy > 0,
    onMoveShouldSetPanResponderCapture: (_, gestureState) => gestureState.dy > 0,
    onPanResponderMove: (evt, gestureState) => {
      if (gestureState.dy > 0) {
        this.state.snippetTranslateY.setValue(gestureState.dy);
      }
    },
    onPanResponderRelease: (evt, gestureState) => {
      if (gestureState.dy > 35) {
        Animated.timing(this.state.snippetTranslateY, { toValue: SNIPPET_HEIGHT, duration: 500 }).start();
      } else if (gestureState.dy < 35) {
        Animated.timing(this.state.snippetTranslateY, { toValue: 0, duration: 500 }).start();
      }
    },
  });

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({ renderLoader: false });
      this.props.actions.searchMasters();
    });
  }

  setMapRef = (ref: MapView) => {
    this.map = ref;
  };

  onMarkerPress = (event: any, index: Number) => {
    const { coordinate } = event.nativeEvent;
    const region = { ...coordinate, latitudeDelta: 0.005, longitudeDelta: 0.005 };
    const activePoint = this.props.points[index];

    this.map.animateToRegion(region, 600);
    this.setState({
      activePin: coordinate,
      activePoint,
      region,
    });

    Animated.timing(this.state.snippetTranslateY, { toValue: 0, duration: 200 }).start();
  };

  onMapPress = () => {
    this.setState({ activePin: null, region: this.state.initialRegion });

    Animated.timing(this.state.snippetTranslateY, { toValue: SNIPPET_HEIGHT, duration: 500 }).start();
  };

  onLocationPress = () => {
    this.map.animateToRegion(this.state.initialRegion, 300);
  };

  onRegionChangeComplete = ({ latitude, longitude }: LatLngType) => {
    this.props.actions.searchMasters({
      coordinates: [ latitude, longitude ],
    });
  };

  render() {
    const { sceneKey, points } = this.props;
    const { region, activePin, activePoint, renderLoader } = this.state;

    if (renderLoader) {
      return null;
    }

    return (
      <View style={styles.container}>
        {sceneKey !== 'masterLocation' && (
          <MapView
            style={styles.map}
            onPress={this.onMapPress}
            initialRegion={region}
            onRegionChangeComplete={this.onRegionChangeComplete}
            ref={this.setMapRef}
          >
            {points.map((point, index) => (
              <MapView.Marker
                coordinate={point.coordinates.latlng}
                key={index}
                onPress={event => this.onMarkerPress(event, index)}
                image={isEqual(point.coordinates.latlng, activePin)
                  ? icons.pinGreen
                  : icons.pinRed
                }
              />
            ))}
          </MapView>
        )}
        <TouchableOpacity
          style={styles.filterButtonWrapper}
          onPress={Actions.pop}
        >
          <View style={styles.filterButton}>
            <Image source={icons.filter} />
            <Text style={styles.filterText}>
              {i18n.filter}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.locationButtonWrapper} onPress={this.onLocationPress}>
          <View style={styles.locationButton}>
            <Image source={icons.location} />
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
          {activePoint && <MapCard onPress={Actions.card} {...activePoint} />}
        </Animated.View>
      </View>
    );
  }
}

const NAV_BAR_WIDTH = 70;

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
