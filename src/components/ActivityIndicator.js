import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

import vars from '../vars';

const ActivityIndicatorComponent = ({
  animating = false,
  position = 'relative',
  size = 'large',
}) => (
  animating && <View style={position === 'absolute' && styles.positionAbsolute}>
    <ActivityIndicator
      animating={animating}
      size={size}
      color={vars.color.red}
    />
  </View>
);

const styles = StyleSheet.create({
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

export default ActivityIndicatorComponent;
