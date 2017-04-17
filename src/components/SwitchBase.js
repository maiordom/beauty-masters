import React, { Component } from 'react';
import { PanResponder, View, TouchableHighlight, Animated, Text } from 'react-native';

export default class SwitchBase extends Component {
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

  componentWillMount = () => {
    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

      onPanResponderGrant: (evt, gestureState) => {
        if (!this.props.enableSlide) return;

        this.setState({ pressed: true });
        this.start.x0 = gestureState.x0;
        this.start.pos = this.state.position._value;
        this.start.moved = false;
        this.start.state = this.state.state;
        this.start.stateChanged = false;
      },
      onPanResponderMove: (evt, gestureState) => {
        if (!this.props.enableSlide) return;

        this.start.moved = true;
        if (this.start.pos == 0) {
          if (gestureState.dx <= this.state.width && gestureState.dx >= 0) {
            this.state.position.setValue(gestureState.dx);
          }
          if (gestureState.dx > this.state.width) {
            this.state.position.setValue(this.state.width);
          }
          if (gestureState.dx < 0) {
            this.state.position.setValue(0);
          }
        }
        if (this.start.pos == this.state.width) {
          if (gestureState.dx >= -this.state.width && gestureState.dx <= 0) {
            this.state.position.setValue(this.state.width + gestureState.dx);
          }
          if (gestureState.dx > 0) {
            this.state.position.setValue(this.state.width);
          }
          if (gestureState.dx < -this.state.width) {
            this.state.position.setValue(0);
          }
        }
        const currentPos = this.state.position._value;
        this.onSwipe(currentPos, this.start.pos,
          () => {
            if (!this.start.state) this.start.stateChanged = true;
            this.setState({ state: true });
          },
          () => {
            if (this.start.state) this.start.stateChanged = true;
            this.setState({ state: false });
          });
      },
      onPanResponderTerminationRequest: (evt, gestureState) => true,
      onPanResponderRelease: (evt, gestureState) => {
        this.setState({ pressed: false });
        const currentPos = this.state.position._value;
        if (!this.start.moved || (Math.abs(currentPos - this.start.pos) < 5 && !this.start.stateChanged)) {
          this.toggle();
          return;
        }
        this.onSwipe(currentPos, this.start.pos, this.activate, this.deactivate);
      },
      onPanResponderTerminate: (evt, gestureState) => {
        const currentPos = this.state.position._value;
        this.setState({ pressed: false });
        this.onSwipe(currentPos, this.start.pos, this.activate, this.deactivate);
      },
      onShouldBlockNativeResponder: (evt, gestureState) => true,
    });
  };

  onSwipe = (currentPosition, startingPosition, onChange, onTerminate) => {
    if (currentPosition - startingPosition >= 0) {
      if (currentPosition - startingPosition > this.state.width / 2 || startingPosition == this.state.width) {
        onChange();
      } else {
        onTerminate();
      }
    } else if (currentPosition - startingPosition < -this.state.width / 2) {
      onTerminate();
    } else {
      onChange();
    }
  };

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
    const callHandlers = this.start.state != state;
    setTimeout(() => {
      this.setState({ state });
      if (callHandlers) {
        this.callback();
      }
    }, this.props.switchAnimationTime / 2);
  };

  callback = () => {
    const state = this.state.state;
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

  render() {
    const padding = this.padding;

    return (
      <View
        {...this._panResponder.panHandlers}
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
  switchAnimationTime: 200,
  borderWidth: 1,
  borderColor: '#ddd',
  onActivate: () => {},
  onDeactivate: () => {},
  onChangeState: () => {},
};
