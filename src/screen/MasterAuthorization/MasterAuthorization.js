import React, { Component } from 'react';
import _ from 'lodash';
import { View, Text, Image, StyleSheet, TouchableHighlight, Platform } from 'react-native';
import { Actions } from 'react-native-router-flux';

import Registration from '../../containers/Registration';
import Login from '../../components/Login';

import i18n from '../../i18n';
import vars from '../../vars';

import { hexToRgba } from '../../utils';

const logoIcon = Platform.select({
  ios: require('../../icons/logo.png'),
  android: require('../../icons/logo-large.png')
});

const switchArrowIcon = Platform.select({
  ios: require('../../icons/ios/switch-arrow.png'),
  android: require('../../icons/android/switch-arrow.png')
});

export default class MasterAuthorization extends Component {
  constructor() {
    super();

    this.state = {
      tabs: [
        {
          key: 'registration',
          component: <Registration />,
          active: true,
          style: styles.tabActive,
          title: i18n.registration,
          action: () => this.onPress('registration')
        },
        {
          key: 'login',
          component: <Login />,
          active: false,
          style: styles.tab,
          title: i18n.login,
          action: () => this.onPress('login')
        }
      ]
    };
  }

  onPress = key => {
    const { tabs } = this.state;
    const activeTab = _.find(tabs, { key });

    _.each(tabs, tab => {
      tab.active = false;
      tab.style = styles.tab;
    });
    activeTab.active = true;
    activeTab.style = styles.tabActive;

    this.setState({ tabs: [...tabs] });
  };

  render() {
    const { tabs } = this.state;
    const TabItem = _.find(tabs, { active: true }).component;

    return (
      <View style={styles.container}>
        <View style={styles.navBar}>
          <TouchableHighlight
            style={styles.close}
            onPress={Actions.pop}
            activeOpacity={1}
            underlayColor="transparent"
          >
            <Image source={require('../../icons/close.png')} />
          </TouchableHighlight>
          <Text style={styles.navTitle}>{i18n.masterAuthorization}</Text>
        </View>
        <Image style={styles.logo} source={logoIcon} />
        <View style={styles.tabs}>
          {_.map(tabs, (tab, index) => <TouchableHighlight
            key={index}
            style={styles.tabItem}
            onPress={tab.action}
            activeOpacity={1}
            underlayColor="transparent"
          >
            <View>
              <Text style={tab.style}>{tab.title}</Text>
              <View style={styles.switchArrow}>
                {tab.active && (
                <Image source={switchArrowIcon} />
                  )}
              </View>
            </View>
          </TouchableHighlight>)}
        </View>
        <View style={styles.tabContent}>
          {TabItem}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: vars.bodyColor,
    alignItems: 'center'
  },
  navBar: {
    height: 40,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    ...Platform.select({
      ios: {
        marginTop: 20
      },
      android: {
        height: 56
      }
    })
  },
  navTitle: {
    color: vars.color.white,
    fontSize: 17,
    ...Platform.select({
      android: {
        fontSize: 20
      }
    })
  },
  close: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 0,
    top: 0,
    width: 40,
    height: 40,
    ...Platform.select({
      android: {
        width: 56,
        height: 56
      }
    })
  },
  logo: {
    marginTop: 56,
    marginBottom: 56,
    ...Platform.select({
      android: {
        marginTop: 40
      }
    })
  },
  tabs: {
    flex: 0,
    flexDirection: 'row'
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  tab: {
    fontSize: 17,
    color: hexToRgba(vars.color.white, 70),
    ...Platform.select({
      android: {
        fontSize: 16
      }
    })
  },
  tabActive: {
    fontSize: 17,
    color: vars.color.white,
    ...Platform.select({
      android: {
        fontSize: 16
      }
    })
  },
  tabContent: {
    alignSelf: 'stretch',
    backgroundColor: vars.color.white,
    flex: 1,
    paddingTop: 32
  },
  switchArrow: {
    height: 8,
    alignItems: 'center',
    ...Platform.select({
      android: {
        height: 6
      }
    })
  }
});
