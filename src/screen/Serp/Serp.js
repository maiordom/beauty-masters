// @flow

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, Platform } from 'react-native';

import SerpNavBar from '../../components/Serp/SerpNavBar';
import Map from '../../containers/Map';
import SerpList from '../../containers/SerpList';

const mapStateToProps = state => ({
  sceneKey: state.scene.sceneKey,
});

type Props = {
  sceneKey: string,
};

type State = {
  activeView: 'map' | 'list',
};

class Serp extends Component<void, Props, State> {
  props: Props;

  state: State;

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
    const { sceneKey } = this.props;

    return (
      <View style={styles.scene}>
        <SerpNavBar
          activeView={activeView}
          onMapPress={this.onMapPress}
          onListPress={this.onListPress}
        />
        {activeView === 'map'
          ? <Map sceneKey={sceneKey} />
          : <SerpList />}
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

export default connect(mapStateToProps, null)(Serp);
