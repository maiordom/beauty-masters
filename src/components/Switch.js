// @flow

import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, Platform, TouchableWithoutFeedback, Switch } from 'react-native';

import { hexToRgba } from '../utils';
import vars from '../vars';

type TProps = {
  customStyles?: {
    container?: Object,
    title?: Object,
  },
  onChange: (state: boolean, modelName?: string) => void,
  modelName?: string,
  title: string,
  value?: boolean,
};

export default class CustomSwitch extends PureComponent<TProps, void> {
  constructor(props) {
    super(props);

    this.state = {
      thumbTintColor: props.value ? vars.color.red : vars.color.switchThumbTintColor,
    };
  }

  onChange = (state: boolean) => {
    this.props.onChange && this.props.onChange(state, this.props.modelName);
    this.setValue(state);
  };

  setValue = (state: boolean) => {
    this.setState({ thumbTintColor: state ? vars.color.red : vars.color.switchThumbTintColor });
  }

  setRef = (ref: Object) => {
    this.ref = ref;
  };

  onPress = () => {
    this.onChange(!this.ref.value);
  };

  componentWillReceiveProps(nextProps: TProps) {
    const { value } = nextProps;

    if (typeof value === 'boolean' && this.ref != null) {
      this.ref.value = value;
      this.setValue(value);
    }
  }

  render() {
    const { title, value, customStyles = {} } = this.props;
    const { thumbTintColor } = this.state;

    return (
      <TouchableWithoutFeedback onPress={this.onPress}>
        <View style={[styles.container, customStyles.container]}>
          <Text style={[styles.title, customStyles.title]}>{title}</Text>
          {Platform.select({
            ios: (<Switch
              style={styles.switch}
              value={value}
              ref={this.setRef}
              onValueChange={this.onChange}
              onTintColor={vars.color.red}
            />),
            android: (<Switch
              style={styles.switch}
              value={value}
              ref={this.setRef}
              onValueChange={this.onChange}
              tintColor={vars.color.switchTintColor}
              onTintColor={vars.color.switchTintActiveColor}
              thumbTintColor={thumbTintColor}
            />),
          })}
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    ...Platform.select({
      android: {
        height: 48,
      },
      ios: {
        paddingTop: 8,
        paddingBottom: 8,
        borderBottomWidth: 1,
        borderBottomColor: vars.color.cellSeparatorColorIOS,
      },
    }),
  },
  switch: {
    ...Platform.select({
      ios: {
        marginRight: 16,
      },
    }),
  },
  title: {
    color: vars.color.black,
    ...Platform.select({
      android: {
        fontSize: 16,
      },
      ios: {
        flex: 1,
        fontSize: 17,
      },
    }),
  },
});
