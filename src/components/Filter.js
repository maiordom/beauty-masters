import React, { Component } from 'react';
import { TouchableHighlight, View, Text, StyleSheet, Platform } from 'react-native';

import vars from '../vars';

import { shouldComponentUpdate } from '../utils';

export default class Filter extends Component {
  shouldComponentUpdate = shouldComponentUpdate();

  onPress = () => {
    this.props.onChange(!this.props.active, this.props.modelName);
  };

  getButtonContentHeight = () => {
    const { subtitle: hasSubtitle } = this.props;

    return {
      height: hasSubtitle ? 64 : 44,
      ...Platform.select({
        android: {
          height: hasSubtitle ? 72 : 48,
        },
      }),
    };
  };

  render() {
    const { title, subtitle } = this.props;

    return (
      <View>
        <TouchableHighlight
          underlayColor="transparent"
          activeOpacity={1}
          onPress={this.onPress}
          style={styles.button}
        >
          <View style={[styles.buttonContent, this.getButtonContentHeight()]}>
            <Text style={styles.title}>{title}</Text>
            {subtitle && (
              <Text style={styles.subtitle}>{subtitle}</Text>
              )}
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    paddingLeft: 15,
    paddingRight: 15,
  },
  buttonContent: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  title: {
    color: vars.color.black,
    ...Platform.select({
      android: {
        fontSize: 16,
      },
    }),
  },
  subtitle: {
    marginTop: 5,
    color: vars.color.grey,
    ...Platform.select({
      android: {
        fontSize: 14,
      },
    }),
  },
});
