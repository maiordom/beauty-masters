// @flow

import React, { PureComponent } from 'react';
import { View, StyleSheet, Platform } from 'react-native';

import SerpNavBar from '../../components/Serp/SerpNavBar';
import Map from '../../containers/Map';
import SerpList from '../../containers/SerpList';

type TState = {
  activeView: 'map' | 'list',
};

export default class Serp extends PureComponent<any, TState> {
  state = {
    activeView: 'map',
  };

  onMapPress = () => {
    this.setState({ activeView: 'map' });
  };

  onListPress = () => {
    this.setState({ activeView: 'list' });
  };

  render() {
    const { activeView } = this.state;
    const { requiresReload } = this.props;

    return (
      <View style={styles.scene}>
        <SerpNavBar
          activeView={activeView}
          onMapPress={this.onMapPress}
          onListPress={this.onListPress}
        />
        {activeView === 'map'
          ? <Map requiresReload={requiresReload} />
          : <SerpList />
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
    ...Platform.select({
      ios: {
        paddingTop: 64,
      },
      android: {
        paddingTop: 54,
      },
    }),
  },
});
