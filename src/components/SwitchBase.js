import React, { PureComponent } from 'react';
import { View, TouchableHighlight, Animated } from 'react-native';

export default class SwitchBase extends PureComponent {
  constructor(props) {
    super(props);

    this.padding = 2;
    this.state = {
      width: this.props.switchWidth - this.props.buttonRadius * 2 + this.padding,
      state: this.props.active,
    };
    this.state.position = new Animated.Value(this.props.active ? this.state.width : 0);
    this.start = {};
  }

  activate = () => {
    Animated.timing(
      this.state.position,
      {
        toValue: this.state.width,
        duration: this.props.switchAnimationTime,
      },
    ).start();
    this.changeState(true);
  };

  deactivate = () => {
    Animated.timing(
      this.state.position,
      {
        toValue: 0,
        duration: this.props.switchAnimationTime,
      },
    ).start();
    this.changeState(false);
  };

  activeImmediately = () => {
    this.setState({
      position: new Animated.Value(this.state.width),
      state: true,
    });
  };

  deactivateImmediately = () => {
    this.setState({
      position: new Animated.Value(0),
      state: false,
    });
  };

  changeStateImmediately = state => {
    if (state) {
      this.activeImmediately();
    } else {
      this.deactivateImmediately();
    }
  };

  changeState = (state) => {
    const callHandlers = this.state.state !== state;
    setTimeout(() => {
      this.setState({ state });
      if (callHandlers) {
        this.callback();
      }
    }, this.props.switchAnimationTime / 2);
  };

  callback = () => {
    const { state } = this.state;

    if (state) {
      this.props.onActivate();
    } else {
      this.props.onDeactivate();
    }
    this.props.onChangeState(state);
  };

  toggle = () => {
    if (!this.props.enableSlide) return;

    if (this.state.state) {
      this.deactivate();
    } else {
      this.activate();
    }
  };

  onPress = () => {
    this.toggle();
  }

  render() {
    const { padding } = this;

    return (
      <View
        style={{ padding: this.padding, position: 'relative' }}
      >
        <View
          style={{
            backgroundColor: this.state.state ? this.props.activeBackgroundColor : this.props.inactiveBackgroundColor,
            height: this.props.switchHeight,
            width: this.props.switchWidth,
            borderRadius: this.props.switchHeight / 2,
            borderWidth: this.props.borderWidth,
            borderColor: this.props.borderColor,
            marginTop: (this.props.buttonRadius * 2 - this.props.switchHeight) / 2 - padding,
          }}
        />
        <TouchableHighlight
          onPress={this.onPress}
          underlayColor="transparent"
          activeOpacity={1}
          style={{
            height: Math.max(this.props.buttonRadius * 2 + padding, this.props.switchHeight + padding),
            width: this.props.switchWidth + padding,
            position: 'absolute',
            top: 0,
            left: 0,
          }}
        >
          <Animated.View
            style={{
              backgroundColor: this.state.state
                ? (this.state.pressed ? this.props.activeButtonPressedColor : this.props.activeButtonColor)
                : (this.state.pressed ? this.props.inactiveButtonPressedColor : this.props.inactiveButtonColor),
              height: this.props.buttonRadius * 2,
              width: this.props.buttonRadius * 2,
              borderRadius: this.props.buttonRadius,
              position: 'absolute',
              top: 0,
              left: 0,
              transform: [{ translateX: this.state.position }],
            }}
          >
            {this.props.buttonContent}
          </Animated.View>
        </TouchableHighlight>
      </View>
    );
  }
}

SwitchBase.defaultProps = {
  active: false,
  style: {},
  inactiveButtonColor: '#2196F3',
  inactiveButtonPressedColor: '#42A5F5',
  activeButtonColor: '#FAFAFA',
  activeButtonPressedColor: '#F5F5F5',
  activeBackgroundColor: 'rgba(255, 255, 255, 0.5)',
  inactiveBackgroundColor: 'rgba(0, 0, 0, 0.5)',
  buttonRadius: 15,
  switchWidth: 40,
  switchHeight: 20,
  buttonContent: null,
  enableSlide: true,
  switchAnimationTime: 100,
  borderWidth: 1,
  borderColor: '#ddd',
  onActivate: () => {},
  onDeactivate: () => {},
  onChangeState: () => {},
};
