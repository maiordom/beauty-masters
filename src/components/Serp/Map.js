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

import getDistance from '../../utils/Geo';

import { shouldComponentUpdate } from '../../utils';

import MapCard from './MapCard';

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
  },
  ios: {
    filter: require('../../icons/ios/filters.png'),
    location: require('../../icons/ios/location.png'),
    pinGreen: require('../../icons/ios/pin-green.png'),
    pinRed: require('../../icons/ios/pin-red.png'),
  },
});

type LatLngType = {
  latitude: number,
  longitude: number,
}

type TState = {
  activePin: ?LatLngType,
  activePoint: TMapCard | null,
  cluster: ClusterInterface,
  clusters: Array<Cluster>,
  distanceToPin: number,
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

  onMarkerPress = (event: any, index: number, coordinate: LatLngType) => {
    const region = { ...coordinate, latitudeDelta: 0.05, longitudeDelta: 0.05 };
    const { cluster, clusters } = this.state;
    const point = clusters[index];
    let activePoint = null;

    if (point.properties.cluster) {
      const leaves = cluster.getLeaves(
        point.properties.cluster_id,
        getZoomLevel(this.state.region),
      );
      activePoint = leaves[0] && leaves[0].properties;
    } else {
      activePoint = point.properties;
    }

    const distanceToPin = getDistance(
      coordinate.latitude,
      coordinate.longitude,
      this.props.initialRegion.latitude,
      this.props.initialRegion.longitude,
    ).toFixed(2);

    this.map.animateToRegion(region, 450);
    this.setState({
      activePin: coordinate,
      activePoint,
      distanceToPin,
      region,
    });

    this.showSnippet();
  };

  onMapPress = (event: any) => {
    this.setState({ activePin: null, region: this.state.initialRegion });

    if (event.nativeEvent.action !== 'marker-press') {
      this.hideSnippet();
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

  onMapCardPress = () => {
    const { activePoint } = this.state;

    if (activePoint) {
      const {
        id,
        photo,
        username,
      } = activePoint;

      Actions.card({
        id,
        photo,
        snippet: activePoint,
        username,
      });
    }
  };

  componentWillReceiveProps({ points }: TProps) {
    const { region } = this.state;

    const geoPoints = convertToGeoPoints(points);
    const cluster = createCluster(geoPoints);
    const clusters = getClusters(cluster, region);

    this.setState({ cluster, clusters });
  }

  render() {
    const { sceneKey } = this.props;
    const { region, activePin, activePoint, renderLoader, clusters } = this.state;

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
            provider={PROVIDER_GOOGLE}
            onRegionChange={debounce(this.onRegionChange, 300)}
            ref={this.setMapRef}
          >
            {clusters.map((cluster, index) => {
              const coordinate = getLatLng(cluster);

              return (
                <MapView.Marker
                  coordinate={coordinate}
                  key={Math.random()}
                  onPress={event => this.onMarkerPress(event, index, coordinate)}
                  image={isEqual(coordinate, activePin)
                    ? icons.pinGreen
                    : icons.pinRed
                  }
                />
              );
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
          {activePoint && <MapCard
            {...activePoint}
            location="map"
            distance={this.state.distanceToPin}
            onPress={this.onMapCardPress}
            region={region}
          />}
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
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
