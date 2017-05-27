// @flow

import React, { Component } from 'react';
import { Animated, View } from 'react-native';

import vars from '../vars';

export default class ImagePlaceholder extends Component {
  props: {
    style: Object,
    source: Object,
    placeholder: any
  };

  state = { opacity: new Animated.Value(1) };

  onLoad = () => {
    Animated.timing(this.state.opacity, { toValue: 1, duration: 250 }).start();
  };

  onPlaceholderLoad = () => {
    Animated.timing(this.state.opacity, { toValue: 0, duration: 250 }).start();
  };

  render() {
    const { style, source, placeholder } = this.props;
    const { opacity } = this.state;

    return (
      <View
        width={style.width}
        height={style.height}
        backgroundColor={vars.color.white}
      >
        <Animated.Image
          resizeMode="cover"
          style={[style, { position: 'absolute' }]}
          source={source}
          onLoad={this.onLoad}
        />
        <Animated.Image
          resizeMode="cover"
          style={[style, { opacity }]}
          source={placeholder}
          onLoad={this.onPlaceholderLoad}
        />
      </View>
    );
  }
}
