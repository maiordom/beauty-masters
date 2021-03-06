// @flow

import React, { PureComponent } from 'react';
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
import supercluster from 'supercluster';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import isEqual from 'lodash/isEqual';
import debounce from 'lodash/debounce';
import take from 'lodash/take';

import getDistance from '../../utils/Geo';

import { hexToRgba } from '../../utils';
import { trackEvent } from '../../utils/Tracker';

import PagedCardContainer from './PagedCardContainer';

import vars from '../../vars';
import i18n from '../../i18n';
import { log } from '../../utils/Log';

import type { TMapCard } from '../../types/MasterTypes';
import type { TRegionType } from '../../types/RegionType';

const icons = Platform.select({
  android: {
    clusterPinGreen: require('../../icons/android/cluster-pin-green.png'),
    clusterPinRed: require('../../icons/android/cluster-pin-red.png'),
    filter: require('../../icons/filter.png'),
    location: require('../../icons/location.png'),
    pinGreen: require('../../icons/pin-green.png'),
    pinRed: require('../../icons/pin-red.png'),
    userLocation: require('../../icons/android/my-location-pin.png'),
  },
  ios: {
    clusterPinGreen: require('../../icons/ios/cluster-pin-green.png'),
    clusterPinRed: require('../../icons/ios/cluster-pin-red.png'),
    filter: require('../../icons/ios/filters.png'),
    location: require('../../icons/ios/location.png'),
    pinGreen: require('../../icons/ios/pin-green.png'),
    pinRed: require('../../icons/ios/pin-red.png'),
    userLocation: require('../../icons/ios/my-location-pin.png'),
  },
});

type LatLngType = {
  latitude: number,
  longitude: number,
}

type TState = {
  activePin: ?LatLngType,
  clusters: Array<Cluster>,
  currentMapCards: Array<TMapCard>,
  region?: TRegionType,
  renderContent: boolean,
  snippetHeight: ?number,
  snippetTranslateY: Animated.Value,
  supercluster: ClusterInterface,
}

type TProps = {
  actions: {
    getLocation: () => Promise<TRegionType>,
    searchMasters: Function,
    setLastMapLocation: Function,
    onFilterPress: Function,
    onMapCardPress: Function,
  },
  initialRegion: TRegionType,
  points: Array<TMapCard>,
  requiresReload: boolean,
  userLocation: TRegionType,
};

type ClusterInterface = {
  getLeaves: Function,
  getClusters: Function,
};

type Cluster = {
  geometry: {
    coordinates: Array<number>,
  },
  properties: {
    cluster_id: number,
    point_count?: number,
  },
};

const convertToGeoPoints = points => points.map(point => ({
  type: 'Feature',
  properties: point,
  geometry: {
    type: 'Point',
    coordinates: [
      point.coordinates.longitude,
      point.coordinates.latitude,
    ],
  },
}));

const createCluster = geoPoints => {
  const index = supercluster({
    radius: 40,
    maxZoom: 15,
  });

  index.load(geoPoints);

  return index;
};

const getZoomLevel = (region: TRegionType) => {
  const angle = region.longitudeDelta;

  return Math.round(Math.log(360 / angle) / Math.LN2);
};

const getLatLng = (cluster: Cluster) => ({
  latitude: cluster.geometry.coordinates[1],
  longitude: cluster.geometry.coordinates[0],
});

const getClusters = (cluster: ClusterInterface, region: TRegionType) => {
  const padding = 0;

  return cluster.getClusters([
    region.longitude - (region.longitudeDelta * (0.5 + padding)),
    region.latitude - (region.latitudeDelta * (0.5 + padding)),
    region.longitude + (region.longitudeDelta * (0.5 + padding)),
    region.latitude + (region.latitudeDelta * (0.5 + padding)),
  ], getZoomLevel(region));
};

const MAX_CURRENT_MAP_CARDS = 10;
const DEFAULT_LATITUDE_DELTA = 0.05;
const DEFAULT_LONGITUDE_DELTA = 0.05;
const DEFAULT_PIN_Z_INDEX = 0;
const ACTIVE_PIN_Z_INDEX = 1;
const USER_LOCATION_Z_INDEX = 777;

export default class Map extends PureComponent<TProps, TState> {
  constructor(props: TProps) {
    super(props);

    const initialRegion = {
      ...props.initialRegion,
      latitudeDelta: props.initialRegion.latitudeDelta || DEFAULT_LATITUDE_DELTA, // 1 delata degree = 111 km, 0.04 = 5km
      longitudeDelta: props.initialRegion.longitudeDelta || DEFAULT_LONGITUDE_DELTA,
    };

    this.state = {
      activePin: null,
      clusters: [],
      currentMapCards: [],
      region: initialRegion,
      renderContent: false,
      snippetHeight: null,
      snippetTranslateY: new Animated.Value(Dimensions.get('window').height),
    };
  }

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
        this.hideSnippet();
      } else if (gestureState.dy < 35) {
        this.showSnippet();
      }
    },
  });

  showSnippet = () => {
    Animated.timing(this.state.snippetTranslateY, {
      duration: 500,
      toValue: 0,
    }).start();
  }

  hideSnippet = () => {
    Animated.timing(this.state.snippetTranslateY, {
      duration: 500,
      toValue: this.state.snippetHeight,
    }).start();
  }

  componentDidMount() {
    this.props.actions.getLocation();
    trackEvent('viewMap');
    InteractionManager.runAfterInteractions(() => {
      this.setState({ renderContent: true });
      this.searchMasters();
    });
  }

  setMapRef = (ref: MapView) => {
    this.map = ref;
  };

  onMarkerPress = (event: any) => {
    const { supercluster, clusters } = this.state;
    const index = parseInt(event.nativeEvent.id, 10);

    if (Number.isNaN(index)) {
      return;
    }

    const point = clusters[index];
    const coordinate = getLatLng(point);

    let currentMapCards = [];
    let region = null;
    if (point.properties.cluster) {
      const leaves = take(supercluster.getLeaves(
        point.properties.cluster_id,
        getZoomLevel(this.state.region),
      ), MAX_CURRENT_MAP_CARDS);

      currentMapCards = leaves.map((leave) => {
        const pointCoordinates = leave.properties.coordinates;
        const distance = getDistance(
          pointCoordinates.latitude,
          pointCoordinates.longitude,
          this.props.userLocation.latitude,
          this.props.userLocation.longitude,
        ).toFixed(2);
        return { ...leave.properties, distance };
      });
      region = { ...this.state.region, ...coordinate };
    } else {
      const distance = getDistance(
        coordinate.latitude,
        coordinate.longitude,
        this.props.userLocation.latitude,
        this.props.userLocation.longitude,
      ).toFixed(2);
      currentMapCards = [{ ...point.properties, distance }];
      region = {
        ...coordinate,
        latitudeDelta: DEFAULT_LATITUDE_DELTA,
        longitudeDelta: DEFAULT_LONGITUDE_DELTA,
      };
    }

    this.map.animateToRegion(region, 450);
    this.setState({
      activePin: coordinate,
      currentMapCards,
      region,
    });

    this.showSnippet();
  };

  onMapPress = (event: any) => {
    if (event.nativeEvent.action !== 'marker-press') {
      this.hideSnippet();
      this.setState({ activePin: null });
    }
  };

  onLocationPress = () => {
    this.props.actions.getLocation().then((userLocation) => {
      this.map.animateToRegion({
        ...userLocation,
        latitudeDelta: DEFAULT_LATITUDE_DELTA,
        longitudeDelta: DEFAULT_LONGITUDE_DELTA,
      }, 300);
    }).catch(() => {
      this.map.animateToRegion({
        ...this.props.userLocation,
        latitudeDelta: DEFAULT_LATITUDE_DELTA,
        longitudeDelta: DEFAULT_LONGITUDE_DELTA,
      }, 300);
    });
  };

  searchMasters = () => {
    const { region } = this.state;

    if (!region) {
      return;
    }

    this.props.actions.searchMasters({
      lat: region.latitude,
      lon: region.longitude,
      radius: Number(((5 * Math.max(region.latitudeDelta, region.longitudeDelta)) / 0.04).toFixed(2)) * 1000,
    });
  }

  onRegionChange = (region: TRegionType) => {
    log('Map::RegionChange', region);

    this.setState({ region });
    this.searchMasters();
    this.props.actions.setLastMapLocation({
      latitude: region.latitude,
      longitude: region.longitude,
    });
  };

  onMapCardPress = (card: TMapCard) => {
    if (card) {
      const {
        id,
        photo,
        username,
      } = card;

      trackEvent('navigateFromMapToCard');

      this.props.actions.onMapCardPress(id, photo, card, username);
    }
  };

  componentWillReceiveProps({ requiresReload, points, userLocation }: TProps) {
    if (!isEqual(userLocation, this.props.userLocation)) {
      const region = {
        ...userLocation,
        latitudeDelta: DEFAULT_LATITUDE_DELTA,
        longitudeDelta: DEFAULT_LONGITUDE_DELTA,
      };
      this.setState({ region });
    }

    const { region } = this.state;

    const geoPoints = convertToGeoPoints(points);
    const supercluster = createCluster(geoPoints);
    const clusters = getClusters(supercluster, region);

    this.setState({ supercluster, clusters });

    if (requiresReload) {
      this.searchMasters();
    }
  }

  render() {
    const {
      activePin,
      clusters,
      currentMapCards,
      region,
      renderContent,
    } = this.state;
    const {
      actions,
      userLocation,
    } = this.props;

    if (!renderContent) {
      return null;
    }

    return (
      <View style={styles.container}>
        <MapView
          initialRegion={region}
          loadingBackgroundColor={hexToRgba(vars.color.black, 0)}
          loadingEnabled
          loadingIndicatorColor={vars.color.red}
          onMapReady={this.onMapReady}
          onMarkerPress={this.onMarkerPress}
          onPress={this.onMapPress}
          onRegionChange={debounce(this.onRegionChange, 300)}
          provider={PROVIDER_GOOGLE}
          ref={this.setMapRef}
          style={styles.map}
        >
          {userLocation && <MapView.Marker
            key={`me.${userLocation.latitude},${userLocation.longitude}`}
            image={icons.userLocation}
            coordinate={userLocation}
            identifier="me"
            zIndex={USER_LOCATION_Z_INDEX}
          /> }
          {clusters.map((pin, index) => {
            const coordinate = getLatLng(pin);

            if (pin.properties.cluster) {
              return (
                <MapView.Marker
                  key={pin.geometry.coordinates.join(',')}
                  coordinate={coordinate}
                  identifier={index.toString()}
                  image={isEqual(coordinate, activePin)
                    ? icons.clusterPinGreen
                    : icons.clusterPinRed
                  }
                  zIndex={isEqual(coordinate, activePin) ? ACTIVE_PIN_Z_INDEX : DEFAULT_PIN_Z_INDEX}
                >
                  <View style={styles.clusterMarker}>
                    <Text style={{ width: 0, height: 0 }}>{Math.random()}</Text>
                    <Text style={styles.clusterMarkerTitle}>{pin.properties.point_count}</Text>
                  </View>
                </MapView.Marker>
              );
            }

            return (
              <MapView.Marker
                coordinate={coordinate}
                key={pin.properties.id + pin.geometry.coordinates.join(',')}
                identifier={index.toString()}
                image={isEqual(coordinate, activePin)
                  ? icons.pinGreen
                  : icons.pinRed
                }
                zIndex={isEqual(coordinate, activePin) ? ACTIVE_PIN_Z_INDEX : DEFAULT_PIN_Z_INDEX}
              >
                <View>
                  <Text style={{ width: 0, height: 0 }}>{Math.random()}</Text>
                </View>
              </MapView.Marker>
            );
          })}
        </MapView>
        <TouchableOpacity
          style={styles.filterButtonWrapper}
          onPress={actions.onFilterPress}
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
          onLayout={(event) => {
            const snippetHeight = event.nativeEvent.layout.height;
            this.state.snippetHeight = snippetHeight;
          }}
        >
          {currentMapCards.length > 0 && <PagedCardContainer
            items={currentMapCards}
            onMapCardPress={this.onMapCardPress}
          />}
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  clusterMarkerTitle: {
    color: vars.color.white,
    fontSize: 14,
    marginTop: 4,
    textAlign: 'center',
  },
  clusterMarker: {
    width: 24,
    height: 32,
  },
  container: {
    flex: 1,
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
