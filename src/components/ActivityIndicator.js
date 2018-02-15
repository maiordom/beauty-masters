import React, { PureComponent } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

import vars from '../vars';

export default class ActivityIndicatorComponent extends PureComponent {
  static defaultProps = {
    animating: false,
    position: 'relative',
    size: 'large',
  };

  render () {
    const {
      animating,
      position,
      size,
    } = this.props;

    return (
      <View style={animating
        ? position === 'absolute'
          ? styles.positionAbsolute
          : null
        : styles.hidden
      }
      >
        <ActivityIndicator
          animating={animating}
          size={size}
          color={vars.color.red}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  hidden: {
    width: 0,
    height: 0,
  },
  positionAbsolute: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
});
