// @flow

import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';
import type { Children } from 'react';

type TState = {
  inited: boolean,
};

type TProps = {
  visible: boolean,
  children?: Children,
};

export default class StateMachine extends PureComponent<void, TProps, TState> {
  state = {
    inited: false,
  };

  constructor(props: TProps) {
    super(props);

    if (props.visible) {
      this.state.inited = true;
    }
  }

  componentWillReceiveProps(nextProps: TProps) {
    if (nextProps.visible && !this.state.inited) {
      this.setState({ inited: true });
    }
  }

  render() {
    const { inited } = this.state;
    const { visible, children } = this.props;

    return (
      <View style={inited && !visible && styles.hidden}>
        {inited && children || null}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  hidden: {
    position: 'absolute',
    width: 0,
    height: 0,
    left: -1000,
  },
});
