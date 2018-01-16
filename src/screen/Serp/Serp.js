// @flow

import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { View, StyleSheet, Platform } from 'react-native';
import get from 'lodash/get';

import SerpNavBar from '../../components/Serp/SerpNavBar';
import Map from '../../containers/Map';
import SerpList from '../../containers/SerpList';

const mapStateToProps = state => ({
  sceneKey: get(state, 'scene.sceneKey'),
});

type TProps = {
  sceneKey: string,
};

type TState = {
  activeView: 'map' | 'list',
};

class Serp extends PureComponent<TProps, TState> {
  props: TProps;

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
    let { sceneKey } = this.props;
    const { sceneKey: prevSceneKey } = this.props.navigationState;

    if (sceneKey === 'serp' || prevSceneKey === 'serp' && sceneKey === 'drawer') {
      sceneKey = 'serp';
    }

    return (
      <View style={styles.scene}>
        <SerpNavBar
          activeView={activeView}
          onMapPress={this.onMapPress}
          onListPress={this.onListPress}
        />
        {activeView === 'map'
          ? sceneKey === 'serp' && <Map key={sceneKey} />
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
