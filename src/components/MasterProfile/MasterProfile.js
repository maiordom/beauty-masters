// @flow

import React, { Component } from 'react';
import {
  View,
  Text,
  Platform,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';

import MasterProfileInfo from '../../containers/MasterProfile/MasterProfileInfo';
import MasterProfileCalendars from '../../containers/MasterProfile/MasterProfileCalendars';
import MasterProfileServices from '../../containers/MasterProfile/MasterProfileServices';

import i18n from '../../i18n';
import vars from '../../vars';

const tabs = [
  {
    key: 'profile',
    title: Platform.select({
      ios: i18n.profile,
      android: i18n.profile.toUpperCase(),
    }),
  },
  {
    key: 'calendar',
    title: Platform.select({
      ios: i18n.calendar,
      android: i18n.calendar.toUpperCase(),
    }),
  },
  {
    key: 'services',
    title: Platform.select({
      ios: i18n.services,
      android: i18n.services.toUpperCase(),
    }),
  },
];

type Props = {
  profile: Object,
  actions: Object,
}

type State = {
  activeTab: string,
  tabBorderOffset: Animated,
}

export default class MasterProfile extends Component<void, Props, State> {
  state = {
    activeTab: 'profile',
    tabBorderOffset: new Animated.Value(0),
  };

  componentDidMount() {
    const { profile, actions } = this.props;

    if (!profile) {
      actions.getUserProfile();
    }
  }

  onTabPress = (activeTab: string, index: number) => () => {
    this.setState({ activeTab });

    Animated
      .timing(this.state.tabBorderOffset, {
        toValue: (Dimensions.get('window').width / 3) * index,
      })
      .start();
  };

  render() {
    const { profile } = this.props;
    const { activeTab, tabBorderOffset } = this.state;

    if (!profile) {
      return <View><Text>Loader</Text></View>;
    }

    return (
      <View style={styles.container}>
        <View style={styles.tabsWrapper}>
          {tabs.map((tab, index) => (
            <TouchableOpacity key={tab.title} onPress={this.onTabPress(tab.key, index)}>
              <Text style={[styles.tabsText, activeTab === tab.key ? styles.tabsTextActive : null]}>
                {tab.title}
              </Text>
            </TouchableOpacity>
          ))}
          <Animated.View
            style={[styles.tabBorder, { left: tabBorderOffset }]}
          />
        </View>
        <View style={styles.content}>
          {activeTab === 'profile' && <MasterProfileInfo />}
          {activeTab === 'calendar' && <MasterProfileCalendars />}
          {activeTab === 'services' && <MasterProfileServices />}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  content: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: vars.color.lightGrey,
  },
  tabsWrapper: {
    height: 48,
    alignSelf: 'stretch',
    backgroundColor: vars.color.red,
    borderTopColor: vars.color.underlineColorAndroid,
    borderTopWidth: 0.5,
    justifyContent: 'space-around',
    alignItems: 'center',
    flexDirection: 'row',
  },
  tabsText: {
    color: vars.color.white,
    opacity: 0.7,
    fontSize: 14,
  },
  tabsTextActive: {
    opacity: 1,
  },
  tabBorder: {
    bottom: 0,
    position: 'absolute',
    width: Dimensions.get('window').width / 3,
    height: 2,
    backgroundColor: vars.color.white,
  },
});
