// @flow

import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight, Image } from 'react-native';

import vars from '../vars';
import { shouldComponentUpdate } from '../utils';

const checkmarkIcon = require('../icons/ios/checkmark-red.png');

type TProps = {
  checked: boolean,
  id: number,
  title: string,
  onChange: (value: boolean, id: number) => void,
};

export default class PickerListItem extends Component<TProps, void> {
  shouldComponentUpdate = shouldComponentUpdate();

  onPress = () => {
    if (this.props.checked) {
      return;
    }

    this.props.onChange && this.props.onChange(!this.props.checked, this.props.id);
  };

  render() {
    const { title, checked } = this.props;

    return (
      <TouchableHighlight
        underlayColor="transparent"
        activeOpacity={1}
        onPress={this.onPress}
        style={styles.container}
      >
        <View style={styles.inner}>
          {
            title && (<Text style={styles.title}>{title}</Text>)
          }
          {
            checked && (<Image style={styles.checkmark} source={checkmarkIcon} />)
          }
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 44,
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  inner: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    flexGrow: 1,
    fontSize: 17,
    color: vars.color.black,
    marginLeft: 15,
  },
  checkmark: {
    marginRight: 15,
  },
});
