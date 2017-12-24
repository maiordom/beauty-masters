// @flow
import React, { Component } from 'react';
import { StyleSheet, Dimensions, Platform } from 'react-native';
import Swiper from 'react-native-swiper';
import MapCard from './MapCard';

import max from 'lodash/max';

import vars from '../../vars';

import type { TMapCard } from '../../types/MasterTypes';

type TProps = {
  items: Array<TMapCard>,
  onMapCardPress: (card: TMapCard) => void,
};

type TState = {
  cardHeight: ?number,
}

export default class PagedCardContainer extends Component<TProps, TState> {
  constructor(props: TProps) {
    super(props);
    this.state = {
      cardHeight: null,
    };
  }

  render() {
    const { items, onMapCardPress } = this.props;
    const { cardHeight } = this.state;
    const heightProps = cardHeight === null ? {} : { height: cardHeight };

    return (<Swiper
      dotColor={vars.color.buttonDisabled}
      activeDotColor={vars.color.red}
      paginationStyle={styles.pagination}
      style={styles.swiper}
      {...heightProps}
    >
      {items.map(item => (
        <MapCard
          onLayout={(event) => {
            const cardHeight = max([event.nativeEvent.layout.height, this.state.cardHeight]);
            if (cardHeight !== this.state.cardHeight) {
              this.setState({ cardHeight });
            }
          }}
          style={styles.card}
          {...item}
          key={item.id}
          onPress={() => onMapCardPress(item)}
          location={'map'}
        />
      ))}
    </Swiper>);
  }
}

const styles = StyleSheet.create({
  card: {
    position: 'absolute',
    bottom: 0,
  },
  pagination: {
    bottom: 4,
  },
  swiper: {
    ...Platform.select({
      android: {
        width: Dimensions.get('window').width,
        height: 210,
      },
    }),
    backgroundColor: vars.color.white,
  },
});
