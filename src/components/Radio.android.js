import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableHighlight, Image } from 'react-native';

const icon = require('../icons/radio.png');
const iconChecked = require('../icons/radio-checked.png');

import vars from '../vars';

export default class Radio extends Component {
  constructor(props) {
    super();

    this.state = {
      checked: Boolean(props.checked),
    };
  }

  toggle() {
    const checked = !this.state.checked;

    this.setState({checked: checked});

    return checked;
  }

  onPress = () => {
    this.toggle();
    this.props.onPress && this.props.onPress(this.state.checked);
  };

  render() {
    const { checked } = this.state;
    const { label } = this.props;

    return (
      <TouchableHighlight
        underlayColor='transparent'
        activeOpacity={1}
        onPress={this.onPress}
        style={styles.container}
      >
        <View style={styles.inner}>
          <Image source={checked ? iconChecked : icon} />
          <Text style={styles.label}>{label}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 48,
    paddingLeft: 24,
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    color: vars.color.black,
    marginLeft: 16,
  }
});
