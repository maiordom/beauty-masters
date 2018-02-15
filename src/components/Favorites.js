// @flow

import React, { PureComponent } from 'react';
import { View, Text, ListView, StyleSheet, Platform, Image, InteractionManager } from 'react-native';
import { Actions } from 'react-native-router-flux';
import type { TMapCard } from '../types/MasterTypes';

import ActivityIndicator from '../containers/ActivityIndicator';
import MapCard from './Serp/MapCard';

import { styles as serpListStyles } from './Serp/SerpList';
import vars from '../vars';
import i18n from '../i18n';

type TState = {
  dataSource: Array<*>,
  refreshing: boolean,
  renderContent: boolean,
};

type TProps = {
  actions: {
    getFavorites: Function,
  },
  cards: Array<TMapCard>,
  isLoaded: boolean,
};

const icons = {
  favorite: Platform.select({
    android: require('../icons/android/fav.png'),
  }),
};

export default class Favorites extends PureComponent<TProps, TState> {
  state: TState;

  constructor(props: TProps) {
    super(props);

    this.state = {
      dataSource: this.ds.cloneWithRows(props.cards),
      refreshing: false,
      renderContent: false,
    };
  }

  ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

  componentDidMount() {
    this.props.actions.getFavorites();

    InteractionManager.runAfterInteractions(() => {
      this.setState({ renderContent: true });
    });
  }

  componentWillReceiveProps(nextProps: TProps) {
    if (this.props.cards !== nextProps.cards) {
      this.setState({
        dataSource: this.ds.cloneWithRows(nextProps.cards),
      });
    }
  }

  onCardPress = (card: TMapCard) => {
    Actions.card({
      from: 'serp',
      id: card.id,
      photo: card.photo,
      snippet: card,
      username: card.username,
    });
  }

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
    const { renderContent } = this.state;
    const { isLoaded, cards } = this.props;

    if (!renderContent) {
      return null;
    }

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
