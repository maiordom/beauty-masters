/* @flow */

import React, { PureComponent } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';

import vars from '../vars';
import { shouldComponentUpdate } from '../utils';

type TProps = {
  active?: boolean,
  customStyles?: Object,
  modelName?: string,
  onChange: (active?: boolean, modelName?: string) => void,
  spacing?: boolean,
  subtitle?: string,
  title: string,
};

export default class Filter extends PureComponent<TProps, void> {
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
    const {
      customStyles = {},
      spacing = true,
      subtitle,
      title,
    } = this.props;

    return (
      <View>
        <TouchableHighlight
          underlayColor="transparent"
          activeOpacity={1}
          onPress={this.onPress}
          style={[
            customStyles.container,
            spacing && styles.spacing,
            styles.container,
          ]}
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
  container: {},
  spacing: {
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
