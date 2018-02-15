import React, { PureComponent } from 'react';
import { Animated } from 'react-native';

export default class Fade extends PureComponent {
  state = {
    visible: this.props.visible,
  };

  componentWillMount() {
    this.visibility = new Animated.Value(this.props.visible ? 1 : 0);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.visible) {
      this.setState({ visible: true });
    }

    Animated
      .timing(this.visibility, {
        toValue: nextProps.visible ? 1 : 0,
        duration: 75,
      })
      .start(() => this.setState({ visible: nextProps.visible }));
  }

  render() {
    const {
      visible, style, children, ...rest
    } = this.props;

    const containerStyle = {
      opacity: this.visibility.interpolate({
        inputRange: [0, 1],
        outputRange: [0, 1],
      }),
      transform: [
        {
          scale: this.visibility.interpolate({
            inputRange: [0, 1],
            outputRange: [1.1, 1],
          }),
        },
      ],
    };

    const combinedStyle = [containerStyle, style];
    return (
      <Animated.View style={this.state.visible ? combinedStyle : containerStyle} {...rest}>
        {this.state.visible ? children : null}
      </Animated.View>
    );
  }
}
