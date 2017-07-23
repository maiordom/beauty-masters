// @flow

import React, { Component } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Platform } from 'react-native';
import { Actions } from 'react-native-router-flux';

import type { MapCardType } from '../../types/MasterTypes';

const icons = {
  favs: require('../../icons/favs.png'),
  favsAdded: require('../../icons/favs-added.png'),
  ...Platform.select({
    android: {
      back: require('../../icons/android/back-arrow.png'),
    },
    ios: {},
  }),
};

type Props = {
  id: number,
  isFavorite: boolean,
  actions: {
    addToFavorites: (snippet: MapCardType) => void,
    removeFromFavorites: (id: number) => void,
  },
  snippet: MapCardType,
}

export default class MasterCardNavBar extends Component<void, Props, void> {
  onFavPress = () => {
    const { actions, id, snippet, isFavorite } = this.props;

    if (isFavorite) {
      actions.removeFromFavorites(id);
    } else {
      actions.addToFavorites(snippet);
    }
  };

  render() {
    const { isFavorite } = this.props;

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={Actions.pop}>
          <Image source={icons.back} style={styles.icon} />
        </TouchableOpacity>
        <TouchableOpacity onPress={this.onFavPress} >
          <Image source={isFavorite ? icons.favsAdded : icons.favs} style={styles.icon} />
        </TouchableOpacity>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 0,
    right: 0,
    margin: 16,
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  icon: {
    width: 24,
    height: 24,
  },
});
