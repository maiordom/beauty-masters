// @flow

import React, { Component } from 'react';
import { View, ListView, StyleSheet } from 'react-native';
import { Actions } from 'react-native-router-flux';

import MapCard from './MapCard';

import vars from '../../vars';

import type { MapCardType } from '../../types/MasterTypes';

type TState = {
  dataSource: Array<*>,
};

type TProps = {
  points: Array<MapCardType>,
};

export default class SerpList extends Component<void, TProps, TState> {
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

  onMapCardPress = (card: MapCardType) => {
    const {
      id,
      isVerified,
      photo,
      username,
    } = card;

    Actions.card({
      id,
      isVerified,
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
          renderRow={data => <MapCard onPress={this.onMapCardPress} {...data} />}
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
