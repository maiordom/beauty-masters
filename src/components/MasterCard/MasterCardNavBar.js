// @flow

import React, { PureComponent } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Platform } from 'react-native';
import { Actions } from 'react-native-router-flux';

import type { TMapCard } from '../../types/MasterTypes';
import { trackEvent } from '../../utils/Tracker';

const icons = {
  favs: require('../../icons/favs.png'),
  favsAdded: require('../../icons/favs-added.png'),
  ...Platform.select({
    android: {
      back: require('../../icons/android/back-arrow.png'),
    },
    ios: {
      back: require('../../icons/ios/back-arrow.png'),
    },
  }),
};

type TProps = {
  actions: {
    addToFavorites: (snippet: TMapCard) => void,
    removeFromFavorites: (id: number) => void,
  },
  id: number,
  isFavorite: boolean,
  snippet: TMapCard,
}

export default class MasterCardNavBar extends PureComponent<TProps, void> {
  onFavPress = () => {
    const {
      actions, id, snippet, isFavorite,
    } = this.props;

    if (isFavorite) {
      actions.removeFromFavorites(id);
    } else {
      trackEvent('addToFavorites');
      actions.addToFavorites(snippet);
    }
  };

  render() {
    const { isFavorite } = this.props;

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={Actions.pop}
          hitSlop={{
            top: 10, left: 10, right: 10, bottom: 10,
          }}
        >
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
    flex: 1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    ...Platform.select({
      android: {
        margin: 16,
      },
      ios: {
        paddingTop: 34,
        paddingLeft: 16,
        paddingRight: 16,
        paddingBottom: 16,
      },
    }),
  },
  icon: {
    ...Platform.select({
      android: {
        width: 24,
        height: 24,
      },
    }),
  },
});
