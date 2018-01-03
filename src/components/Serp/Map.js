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
import supercluster from 'supercluster';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import { Actions } from 'react-native-router-flux';
import isEqual from 'lodash/isEqual';
import debounce from 'lodash/debounce';
import take from 'lodash/take';

import getDistance from '../../utils/Geo';

import { shouldComponentUpdate } from '../../utils';

import PagedCardContainer from './PagedCardContainer';

import vars from '../../vars';
import i18n from '../../i18n';

import type { TMapCard } from '../../types/MasterTypes';
import type { TRegionType } from '../../types/RegionType';

const icons = Platform.select({
  android: {
    filter: require('../../icons/filter.png'),
    location: require('../../icons/location.png'),
    pinGreen: require('../../icons/pin-green.png'),
    pinRed: require('../../icons/pin-red.png'),
    clusterPinRed: require('../../icons/android/cluster-pin-red.png'),
    clusterPinGreen: require('../../icons/android/cluster-pin-green.png'),
  },
  ios: {
    filter: require('../../icons/ios/filters.png'),
    location: require('../../icons/ios/location.png'),
    pinGreen: require('../../icons/ios/pin-green.png'),
    pinRed: require('../../icons/ios/pin-red.png'),
    clusterPinRed: require('../../icons/ios/cluster-pin-red.png'),
    clusterPinGreen: require('../../icons/ios/cluster-pin-green.png'),
  },
});

type LatLngType = {
  latitude: number,
  longitude: number,
}

type TState = {
  activePin: ?LatLngType,
  supercluster: ClusterInterface,
  clusters: Array<Cluster>,
  currentMapCards: Array<TMapCard>,
  initialRegion?: TRegionType,
  region?: TRegionType,
  renderLoader: boolean,
  showSnippet: boolean,
  snippetHeight: ?number,
  snippetTranslateY: Animated.Value,
}

type TProps = {
  actions: {
    getLocation: () => void,
    searchMasters: Function,
    setLastMapLocation: Function,
  },
  initialRegion: TRegionType,
  points: Array<TMapCard>,
  sceneKey: string,
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

export default class Map extends Component<TProps, TState> {
  constructor(props: TProps) {
    super();

    const initialRegion = {
      ...props.initialRegion,
      latitudeDelta: props.initialRegion.latitudeDelta || 0.05, // 1 delata degree = 111 km, 0.04 = 5km
      longitudeDelta: props.initialRegion.longitudeDelta || 0.05,
    };

    this.state = {
      initialRegion,
      region: initialRegion,
      renderLoader: true,
      showSnippet: false,
      snippetTranslateY: new Animated.Value(Dimensions.get('window').height),
      activePin: null,
      activePoint: null,
      clusters: [],
      cluster: {
        getLeaves: () => [],
        getClusters: () => [],
      },
      currentMapCards: [],
      snippetHeight: null,
    };
  }

  shouldComponentUpdate = shouldComponentUpdate;

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
    Animated.timing(this.state.snippetTranslateY, { toValue: 0, duration: 500 }).start();
  }

  hideSnippet = () => {
    Animated.timing(this.state.snippetTranslateY, {
      toValue: this.state.snippetHeight,
      duration: 500,
    }).start();
  }

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => {
      this.setState({ renderLoader: false });
      this.searchMasters();
    });
  }

  setMapRef = (ref: MapView) => {
    this.map = ref;
  };

  onMarkerPress = (event: any) => {
    const { supercluster, clusters } = this.state;
    const index = parseInt(event.nativeEvent.id, 10);
    if (isNaN(index)) {
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
      
      currentMapCards = leaves.map(leave => {
        const pointCoordinates = leave.properties.coordinates;
        const distance = getDistance(
          pointCoordinates.latitude,
          pointCoordinates.longitude,
          this.props.initialRegion.latitude,
          this.props.initialRegion.longitude,
        ).toFixed(2);
        return { ...leave.properties, distance };
      });
      region = { ...this.state.region, ...coordinate };
    } else {
      const distance = getDistance(
        coordinate.latitude,
        coordinate.longitude,
        this.props.initialRegion.latitude,
        this.props.initialRegion.longitude,
      ).toFixed(2);
      currentMapCards = [{ ...point.properties, distance }];
      region = { ...coordinate, latitudeDelta: 0.05, longitudeDelta: 0.05 };
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
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
      }, 300);
    });
  };

  searchMasters = () => {
    const region = this.state.region;

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
    console.log('Map::RegionChange', region);

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

      Actions.card({
        id,
        photo,
        snippet: card,
        username,
      });
    }
  };

  componentWillReceiveProps({ points }: TProps) {
    const { region } = this.state;

    const geoPoints = convertToGeoPoints(points);
    const supercluster = createCluster(geoPoints);
    const clusters = getClusters(supercluster, region);

    this.setState({ supercluster, clusters });
  }

  render() {
    const { sceneKey } = this.props;
    const { region, activePin, currentMapCards, renderLoader, clusters } = this.state;

    if (renderLoader) {
      return null;
    }

    return (
      <View style={styles.container}>
        {sceneKey !== 'masterLocation' && (
          <MapView
            style={styles.map}
            onPress={this.onMapPress}
            onMarkerPress={this.onMarkerPress}
            initialRegion={region}
            provider={PROVIDER_GOOGLE}
            onRegionChange={debounce(this.onRegionChange, 300)}
            ref={this.setMapRef}
          >
            {clusters.map((pin, index) => {
              const coordinate = getLatLng(pin);

              if (pin.properties.cluster) {
                return (
                  <MapView.Marker
                    coordinate={coordinate}
                    key={Math.random()}
                    identifier={index.toString()}
                    image={isEqual(coordinate, activePin)
                    ? icons.clusterPinGreen
                    : icons.clusterPinRed
                  }
                  >
                    <View style={styles.clusterMarker}>
                      <Text style={styles.clusterMarkerTitle}>{pin.properties.point_count}</Text>
                    </View>
                  </MapView.Marker>
                );
              } else {
                return (
                  <MapView.Marker
                    coordinate={coordinate}
                    key={Math.random()}
                    identifier={index.toString()}
                    image={isEqual(coordinate, activePin)
                      ? icons.pinGreen
                      : icons.pinRed
                    }
                  />
                );
              }
            })}
          </MapView>
        )}
        <TouchableOpacity
          style={styles.filterButtonWrapper}
          onPress={Actions.searchForm}
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
    flex: 1,
    marginTop: 6,
    textAlign: 'center',
    ...Platform.select({
      android: {
        marginLeft: 3,
      },
    }),
  },
  clusterMarker: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
