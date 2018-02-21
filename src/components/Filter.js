/* @flow */

import React, { PureComponent } from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableOpacity,
  View,
} from 'react-native';

import Separator from './Separator.ios';

import vars from '../vars';

type TProps = {
  active?: boolean,
  controlTitle?: string,
  customStyles?: Object,
  modelName?: string,
  onChange: (active?: boolean, modelName?: string) => void,
  shouldShowSeparator?: boolean,
  spacing?: boolean,
  subtitle?: string,
  title: string,
};

export default class Filter extends PureComponent<TProps, void> {
  onControlPress = () => {
    this.props.onControlPress && this.props.onControlPress();
  };

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
      controlTitle,
      customStyles = {},
      shouldShowSeparator = true,
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
            <View style={styles.titleWrapper}>
              <Text style={styles.title}>{title}</Text>
              {controlTitle && (
                <TouchableOpacity onPress={this.onControlPress}>
                  <Text>{controlTitle}</Text>
                </TouchableOpacity>
              )}
            </View>
            {subtitle && (
              <Text style={styles.subtitle}>{subtitle}</Text>
            )}
          </View>
        </TouchableHighlight>
        {shouldShowSeparator && Platform.OS === 'ios' && (
          <Separator />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  titleWrapper: {
    alignSelf: 'stretch',
    flex: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
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
      ios: {
        fontSize: 17,
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
      ios: {
        fontSize: 12,
      },
    }),
  },
});
