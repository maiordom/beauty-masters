// @flow

import React, { PureComponent } from 'react';
import {
  View,
  Text,
  Platform,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
} from 'react-native';

import ActivityIndicator from '../../containers/ActivityIndicator';
import MasterProfileInfo from '../../containers/MasterProfile/MasterProfileInfo';
import MasterProfileCalendars from '../../containers/MasterProfile/MasterProfileCalendars';
import MasterProfileServices from '../../containers/MasterProfile/MasterProfileServices';

import i18n from '../../i18n';
import vars from '../../vars';

const tabs = [
  {
    key: 'info',
    title: Platform.select({
      ios: i18n.profile,
      android: i18n.profile.toUpperCase(),
    }),
  },
  {
    key: 'calendars',
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

type TProps = {
  actions: Object,
  profile: Object,
  sectionKey: string,
}

type TState = {
  tabBorderOffset: Animated,
  tabCurrentKey: string,
}

const getTabBorderOffset = (sectionKey: string) => {
  let tabIndex = 0;

  tabs.forEach((tab, index) => {
    if (tab.key === sectionKey) {
      tabIndex = index;
    }
  });

  return (Dimensions.get('window').width / 3) * tabIndex;
};

export default class MasterProfile extends PureComponent<TProps, TState> {
  state = {
    tabBorderOffset: new Animated.Value(getTabBorderOffset(this.props.sectionKey)),
    tabCurrentKey: this.props.sectionKey,
  };

  componentDidMount() {
    this.props.actions.getUserProfile();
  }

  onTabPress = (tabCurrentKey: string, index: number) => () => {
    this.setState({ tabCurrentKey });
    this.props.actions.selectProfileSection(tabCurrentKey);

    Animated
      .timing(this.state.tabBorderOffset, {
        toValue: (Dimensions.get('window').width / 3) * index,
      })
      .start();
  };

  render() {
    const { profile } = this.props;
    const { tabCurrentKey, tabBorderOffset } = this.state;

    if (!profile.userId) {
      return (
        <View style={styles.container}>
          <ActivityIndicator position="absolute" />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <ActivityIndicator position="absolute" />
        <View style={styles.tabsWrapper}>
          {tabs.map((tab, index) => (
            <TouchableOpacity style={styles.tab} key={tab.title} onPress={this.onTabPress(tab.key, index)}>
              <Text style={[styles.tabsText, tabCurrentKey === tab.key ? styles.tabsTextActive : null]}>
                {tab.title}
              </Text>
            </TouchableOpacity>
          ))}
          <Animated.View
            style={[styles.tabBorder, { left: tabBorderOffset }]}
          />
        </View>
        <View style={styles.content}>
          {tabCurrentKey === 'info' && <MasterProfileInfo />}
          {tabCurrentKey === 'calendars' && <MasterProfileCalendars />}
          {tabCurrentKey === 'services' && <MasterProfileServices />}
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
    alignSelf: 'stretch',
    backgroundColor: vars.color.red,
    borderTopColor: vars.color.underlineColorAndroid,
    borderTopWidth: 0.5,
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  tab: {
    flex: 1,
    height: 48,
    alignItems: 'center',
    justifyContent: 'center',
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
