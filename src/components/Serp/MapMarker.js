// @flow

import React, { Component } from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

import vars from '../../vars';

export default class MapMarker extends Component {
  props: {
    isActive: boolean,
    locations: ?number,
  };

  render() {
    const { isActive, locations } = this.props;

    console.log('marker render, isActive', isActive);

    return (
      <View style={styles.container}>
        {isActive
          ? <Image source={require('../../icons/pin-green.png')} />
          : <Image source={require('../../icons/pin-red.png')} />
        }
        {locations && <Text style={styles.text}>1</Text>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: 24,
    height: 34,
  },
  text: {
    position: 'absolute',
    top: 3,
    left: 8,
    color: vars.color.white,
  },
});
