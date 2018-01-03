// @flow

import React, { Component } from 'react';
import { View, ListView, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';

import MapCard from './MapCard';

import vars from '../../vars';
import getDistance from '../../utils/Geo';

import type { TMapCard } from '../../types/MasterTypes';

type TState = {
  dataSource: Array<*>,
};

type TProps = {
  initialRegion: {
    latitude: number,
    longitude: number,
  },
  points: Array<TMapCard>,
};

export default class SerpList extends Component<TProps, TState> {
  state = {
    dataSource: [],
  };

  constructor(props: TProps) {
    super(props);

    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

    this.state = {
      dataSource: ds.cloneWithRows(this.props.points),
    };
  }

  onMapCardPress = (card: TMapCard) => {
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
  };

  render() {
    const { dataSource } = this.state;

    return (
      <View>
        <ListView style={styles.list}
          initialListSize={3}
          pageSize={3}
          dataSource={dataSource}
          renderRow={item => {
            const { initialRegion } = this.props;
            const { coordinates } = item;

            const distance = getDistance(
              coordinates.latitude,
              coordinates.longitude,
              initialRegion.latitude,
              initialRegion.longitude,
            ).toFixed(2);

            return (
              <MapCard onPress={this.onMapCardPress} distance={distance} {...item} />
            );
          }}
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
