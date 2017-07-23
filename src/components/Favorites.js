// @flow

import React, { Component } from 'react';
import { View, Text, ListView, StyleSheet, Platform, Image } from 'react-native';
import { Actions } from 'react-native-router-flux';
import type { MapCardType } from '../types/MasterTypes';

import ActivityIndicator from '../containers/ActivityIndicator';
import MapCard from './Serp/MapCard';

import { styles as serpListStyles } from './Serp/SerpList';
import vars from '../vars';
import i18n from '../i18n';

type State = {
  refreshing: boolean,
  dataSource: Array<*>,
};

type Props = {
  actions: {
    getFavorites: Function,
  },
  cards: Array<MapCardType>,
  isLoaded: boolean,
};

const icons = {
  favorite: Platform.select({
    android: require('../icons/android/fav.png'),
  }),
};

export default class Favorites extends Component<void, Props, State> {
  state: State;

  constructor(props: Props) {
    super(props);

    this.state = {
      refreshing: false,
      dataSource: this.ds.cloneWithRows(props.cards),
    };
  }

  ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

  componentDidMount() {
    this.props.actions.getFavorites();
  }

  componentWillReceiveProps(nextProps: Props) {
    if (this.props.cards !== nextProps.cards) {
      this.setState({
        dataSource: this.ds.cloneWithRows(nextProps.cards),
      });
    }
  }

  onCardPress = (card : MapCardType) => Actions.card(card);

  renderEmptyScreen = () => (
    <View style={styles.emptyScreen}>
      <ActivityIndicator position="absolute" />
      <Image style={styles.icon} source={icons.favorite} />
      <Text style={styles.title}>{i18n.favoriteEmpty.title}</Text>
      <Text style={styles.text}>{i18n.favoriteEmpty.text}</Text>
    </View>
  );

  renderFavList = () => (
    <ListView
      style={serpListStyles.list}
      initialListSize={3}
      pageSize={3}
      dataSource={this.state.dataSource}
      renderRow={data => <MapCard onPress={this.onCardPress} {...data} type="favorites" />}
      renderSeparator={(sectionId, rowId) => <View key={rowId} style={serpListStyles.separator} />}
    />
  );

  render() {
    const { isLoaded, cards } = this.props;

    if (!isLoaded) {
      return (
        <View style={styles.container}>
          <ActivityIndicator position="absolute" />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        {cards.length > 0
          ? this.renderFavList()
          : this.renderEmptyScreen()
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: vars.color.darkGrey,
  },
  emptyScreen: {
    flex: 1,
    paddingRight: 35,
    paddingLeft: 35,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 80,
    height: 80,
  },
  title: {
    fontSize: 16,
    color: vars.color.black,
    marginTop: 32,
  },
  text: {
    color: vars.color.grey,
    textAlign: 'center',
    marginTop: 10,
  },
});
