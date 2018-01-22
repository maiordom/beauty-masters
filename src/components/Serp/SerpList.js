// @flow

import React, { Component } from 'react';
import { View, ListView, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';

import MapCard from './MapCard';

import vars from '../../vars';
import { trackEvent } from '../../utils/Tracker';

import type { TMapCard } from '../../types/MasterTypes';

type TState = {
  dataSource: Array<*>,
};

type TProps = {
  actions: {
    searchMastersList: Function,
  },
  initialRegion: TRegionType,
  userLocation: TRegionType,
  points: Array<TMapCard & { distance: number }>,
};

const DEFAULT_LIST_SEARCH_RADIUS = 10000;

export default class SerpList extends Component<TProps, TState> {
  state = {
    dataSource: [],
  };

  ds: ListView.DataSource;

  constructor(props: TProps) {
    super(props);

    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

    this.state = {
      dataSource: this.ds.cloneWithRows(this.props.points),
    };
  }

  componentDidMount() {
    trackEvent('viewSerp');
    this.searchMasters();
  }

  componentWillReceiveProps(nextProps: TProps) {
    if (this.props.items !== nextProps.points) {
      this.setState({
        dataSource: this.ds.cloneWithRows(nextProps.points),
      });
    }
  }

  searchMasters = () => {
    const { userLocation } = this.props;

    if (!userLocation) {
      return;
    }

    this.props.actions.searchMastersList({
      lat: userLocation.latitude,
      lon: userLocation.longitude,
      radius: DEFAULT_LIST_SEARCH_RADIUS,
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
    const { dataSource } = this.state;

    return (
      <View>
        <ListView style={styles.list}
          initialListSize={3}
          pageSize={3}
          dataSource={dataSource}
          renderRow={item => (
            <MapCard onPress={this.onMapCardPress} distance={item.distance} {...item} />
          )}
          renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
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
  separator: {
    height: 8,
    backgroundColor: vars.color.darkGrey,
  },
});
