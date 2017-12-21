// @flow
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import Swiper from 'react-native-swiper';
import MapCard from './MapCard';

import vars from '../../vars';

import type { TMapCard } from '../../types/MasterTypes';

type TProps = {
  items: Array<TMapCard>,
  onMapCardPress: (card: TMapCard) => void,
};

type TState = {
  cardHeight: number,
}

export default class PagedCardContainer extends Component<TProps, TState> {
  constructor(props: TProps) {
    super(props);
    this.state = {
      cardHeight: 190,
    };
  }

  render() {
    const { items, onMapCardPress } = this.props;
    const { cardHeight } = this.state;

    return (<Swiper
      onLayout={(event) => {
        const cardHeight = event.nativeEvent.layout.height;
        this.state.cardHeight = cardHeight;
      }}
      dotColor={vars.color.buttonDisabled}
      activeDotColor={vars.color.red}
      paginationStyle={styles.pagination}
      height={cardHeight}
      style={styles.swiper}
    >
      {items.map(item => (
        <MapCard
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
    backgroundColor: vars.color.white,
  },
});
