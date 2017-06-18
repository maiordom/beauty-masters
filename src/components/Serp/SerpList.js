// @flow

import React, { Component } from 'react';
import { View, ListView, StyleSheet } from 'react-native';

import MapCard from './MapCard';

import vars from '../../vars';

import type { MapCardType } from '../../types/MasterTypes';

type State = {
  dataSource: Array<*>,
};

type Props = {
  points: Array<MapCardType>,
};

export default class SerpList extends Component<void, Props, State> {
  state = {
    dataSource: [],
  };

  constructor(props: Props) {
    super(props);

    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

    this.state = {
      dataSource: ds.cloneWithRows(this.props.points),
    };
  }

  render() {
    const { dataSource } = this.state;

    return (
      <View>
        <ListView style={styles.list}
          initialListSize={3}
          pageSize={3}
          dataSource={dataSource}
          renderRow={data => <MapCard {...data} />}
          renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  list: {
    padding: 8,
    backgroundColor: vars.color.darkGrey,
  },
  separator: {
    height: 8,
    backgroundColor: vars.color.darkGrey,
  },
});
