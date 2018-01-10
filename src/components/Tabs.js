import React, { Component } from 'react';
import _ from 'lodash';
import { TouchableHighlight, View, Text, StyleSheet, Platform } from 'react-native';

import vars from '../vars';

export default class Tabs extends Component {
  constructor(props) {
    super();

    const { tabs } = props;

    this.state = { tabs };

    if (Platform.OS === 'android') {
      _.each(tabs, (tab) => {
        tab.title = tab.title.toUpperCase();
      });
    }

    if (!_.find(tabs, { active: true })) {
      tabs[0].active = true;
    }
  }

  componentWillReceiveProps({ tabActiveKey }) {
    if (tabActiveKey === this.state.tabActiveKey) {
      return;
    }

    const { tabs } = this.state;

    _.each(tabs, (tab) => {
      tab.active = tab.key === tabActiveKey;
    });

    this.setState({
      tabs: [...tabs],
      tabActiveKey,
    });
  }

  onPress = activeIndex => {
    const { tabs } = this.state;
    const tabActive = tabs[activeIndex];

    _.each(tabs, (tab, index) => {
      tab.active = index === activeIndex;
    });

    this.setState({
      tabs: [...tabs],
      tabActiveKey: tabActive.key,
    });
    this.props.onPress && this.props.onPress(tabActive);
  };

  render() {
    const { tabs } = this.state;
    const { onPress } = this;

    return (
      <View style={styles.tabs}>
        {_.map(tabs, (tab, index) => (
          <TouchableHighlight
            key={index}
            style={[styles.tab, tab.active && styles.tabActive]}
            onPress={() => onPress(index)}
            activeOpacity={1}
            underlayColor="transparent"
          >
            <View style={styles.tabContainer}>
              <Text style={[styles.tabText, tab.active && styles.tabTextActive]}>{tab.title}</Text>
              <View style={tab.active && styles.border} />
            </View>
          </TouchableHighlight>
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tabs: {
    flexDirection: 'row',
    ...Platform.select({
      android: {
        height: 48,
      },
    }),
  },
  tab: {
    flex: 1,
  },
  tabContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabText: {
    textAlign: 'center',
    color: vars.color.black,
  },
  tabTextActive: {
    color: vars.color.red,
  },
  border: {
    position: 'absolute',
    height: 2,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: vars.color.red,
  },
});
