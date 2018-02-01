// @flow

import React, { PureComponent } from 'react';
import { View, ListView, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';

import sortBy from 'lodash/sortBy';
import isEqual from 'lodash/isEqual';

import MapCard from './MapCard';

import vars from '../../vars';
import i18n from '../../i18n';
import { trackEvent } from '../../utils/Tracker';
import getDistance from '../../utils/Geo';

import type { TMapCard } from '../../types/MasterTypes';
import type { TRegionType } from '../../types/RegionType';

type TState = {
  dataSource: ListView.DataSource,
  isExtendedSetLoaded: boolean,
};

type TProps = {
  actions: {
    searchMastersList: Function,
  },
  initialRegion: TRegionType,
  userLocation: TRegionType,
  points: Array<TMapCard>,
};

const DEFAULT_LIST_SEARCH_RADIUS = 10000;
const EXTENDED_LIST_SEARCH_RADIUS = 50000;

export default class SerpList extends PureComponent<TProps, TState> {
  ds: ListView.DataSource;

  constructor(props: TProps) {
    super(props);

    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1.id !== r2.id });

    this.state = {
      dataSource: this.ds.cloneWithRows(this.props.points),
      isExtendedSetLoaded: false,
    };
  }

  componentDidMount() {
    trackEvent('viewSerp');
    this.searchMasters(DEFAULT_LIST_SEARCH_RADIUS);
  }

  componentWillReceiveProps(nextProps: TProps) {
    if (this.props.points !== nextProps.points) {
      this.updateDataSourceWithPoints(nextProps.points);
    }
  }

  updateDataSourceWithPoints(points: Array<TMapCard>) {
    const sortedPoints = sortBy(points.map(item => {
      const { coordinates } = item;
      const { userLocation } = this.props;
      const distance = getDistance(
        coordinates.latitude,
        coordinates.longitude,
        userLocation.latitude,
        userLocation.longitude,
      ).toFixed(2);

      return { ...item, distance };
    }), (point) => Number(point.distance));

    this.setState({
      dataSource: this.ds.cloneWithRows(sortedPoints),
    });
  }

  searchMasters = (radius: number) => {
    const { userLocation } = this.props;

    if (!userLocation) {
      return;
    }

    this.props.actions.searchMastersList({
      lat: userLocation.latitude,
      lon: userLocation.longitude,
      radius,
    });
  }

  onMapCardPress = (card: TMapCard) => {
    const {
      id,
      photo,
      username,
    } = card;

    trackEvent('navigateFromSerpToCard');

    Actions.card({
      from: 'serp',
      id,
      photo,
      snippet: card,
      username,
    });
  };

  render() {
    const { dataSource, isExtendedSetLoaded } = this.state;

    return (
      <View>
        <ListView style={styles.list}
          pageSize={3}
          dataSource={dataSource}
          renderRow={item => (
            <MapCard onPress={this.onMapCardPress} distance={item.distance} {...item} />
          )}
          renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
          renderFooter={() => {
            const shouldShowLoadMoreButton = dataSource.getRowCount() > 0 && !isExtendedSetLoaded;
            return shouldShowLoadMoreButton ? (
              <TouchableOpacity
                style={styles.loadMoreButton}
                onPress={() => {
                  this.searchMasters(EXTENDED_LIST_SEARCH_RADIUS);
                  this.setState({ ...this.state, isExtendedSetLoaded: true });
                }}
              >
                <Text style={styles.loadMoreTitle}>{i18n.showMore}</Text>
              </TouchableOpacity>) : null;
          }}
        />
      </View>
    );
  }
}

export const styles = StyleSheet.create({
  list: {
    padding: 8,
    backgroundColor: vars.color.darkGrey,
  },
  loadMoreButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 16,
    paddingBottom: 16,
    marginBottom: 10,
  },
  loadMoreTitle: {
    color: vars.color.red,
    fontSize: 16,
  },
  separator: {
    height: 8,
    backgroundColor: vars.color.darkGrey,
  },
});
