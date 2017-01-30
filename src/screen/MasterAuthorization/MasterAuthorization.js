import React, { Component } from 'react';
import _ from 'lodash';
import { View, Text, Image, StyleSheet, TouchableHighlight } from 'react-native';
import { Actions } from 'react-native-router-flux';

import Registration from '../../components/Registration';
import Login from '../../components/Login';

import i18n from '../../i18n';
import vars from '../../vars';

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
    const {tabs} = this.state;
    const activeTab = _.find(tabs, {key});

    _.each(tabs, tab => {
      tab.active = false;
      tab.style = styles.tab;
    });
    activeTab.active = true;
    activeTab.style = styles.tabActive;

    this.setState({tabs: [...tabs]});
  };

  render() {
    const {tabs} = this.state;
    const TabItem = _.find(tabs, {active: true}).component;

    return (
      <View style={styles.container}>
        <View style={styles.navBar}>
          <TouchableHighlight style={styles.close} onPress={Actions.presentation}>
            <Image source={require('../../components/icons/close.png')} />
          </TouchableHighlight>
          <Text style={styles.navTitle}>{i18n.masterAuthorization}</Text>
        </View>
        <Image style={styles.logo} source={require('../../components/icons/logo.png')} />
        <View style={styles.tabs}>
          {_.map(tabs, (tab, index) => {
            return <TouchableHighlight
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
                    <Image source={require('../../components/icons/switch-arrow.png')} />
                  )}
                </View>
              </View>
            </TouchableHighlight>;
          })}
        </View>
        <View style={styles.tabContent}>
          {TabItem}
          <Text>I'm</Text>
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
    marginTop: 20,
    height: 40,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  navTitle: {
    color: vars.color.white,
    fontSize: 17
  },
  close: {
    position: 'absolute',
    left: 15,
    top: 13
  },
  logo: {
    marginTop: 56,
    marginBottom: 56
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
    color: 'rgba(255, 255, 255, 0.7)'
  },
  tabActive: {
    fontSize: 17,
    color: vars.color.white,
  },
  tabContent: {
    alignSelf: 'stretch',
    backgroundColor: vars.color.white,
    flex: 1
  },
  switchArrow: {
    height: 8,
    alignItems: 'center'
  }
});
