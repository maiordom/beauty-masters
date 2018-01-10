// @flow
import React, { Component } from 'react';
import { StyleSheet, Dimensions, Platform, View, ListView } from 'react-native';

import MapCard from './MapCard';

import vars from '../../vars';

import type { TMapCard } from '../../types/MasterTypes';

type TProps = {
  items: Array<TMapCard>,
  onMapCardPress: (card: TMapCard) => void,
};

type TState = {
  items: any,
  currentCardIndex: number,
}

export default class PagedCardContainer extends Component<TProps, TState> {
  listView: ?ListView = null;

  constructor(props: TProps) {
    super(props);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1.id !== r2.id });

    this.state = {
      items: ds.cloneWithRows(props.items),
      currentCardIndex: 0,
    };
  }

  componentWillReceiveProps(nextProps: TProps) {
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1.id !== r2.id });
    this.setState({
      items: ds.cloneWithRows(nextProps.items),
      currentCardIndex: 0,
    });

    if (this.listView != null) {
      this.listView.scrollTo({ x: 0, y: 0, animated: false });
    }
  }

  onCardSwipe = (event: any) => {
    const clientWidth = Dimensions.get('window').width;
    const xOffset = event.nativeEvent.contentOffset.x;
    const currentCardIndex = Math.round(xOffset / clientWidth);

    if (this.state.currentCardIndex !== currentCardIndex) {
      this.setState({ currentCardIndex });
    }
  };

  renderCard = (card: TMapCard) => {
    const { onMapCardPress } = this.props;

    return (
      <MapCard
        {...card}
        key={card.id}
        onPress={() => onMapCardPress(card)}
        location="map"
      />
    );
  };

  render() {
    return (<View style={styles.container}>
      <ListView
        dataSource={this.state.items}
        horizontal
        onScroll={this.onCardSwipe}
        pagingEnabled
        ref={(component) => { this.listView = component; }}
        renderRow={(card) => this.renderCard(card)}
        scrollEventThrottle={200}
        showsHorizontalScrollIndicator={false}
      />
      {this.props.items.length > 1 && (
        <View style={styles.dots}>
          {this.props.items.map((card, index) => (
            <View
              key={card.id}
              style={[styles.dot, this.state.currentCardIndex === index ? styles.dotActive : {}]}
            />
          ))}
        </View>
      )}
    </View>);
  }
}

const styles = StyleSheet.create({
  container: {
    ...Platform.select({
      android: {
        width: Dimensions.get('window').width,
      },
    }),
    backgroundColor: vars.color.white,
  },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 6,
  },
  dot: {
    width: 8,
    height: 8,
    backgroundColor: vars.color.grey,
    borderRadius: 50,
    marginRight: 6,
  },
  dotActive: {
    backgroundColor: vars.color.red,
  },
});
