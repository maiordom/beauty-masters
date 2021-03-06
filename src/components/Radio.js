import React, { PureComponent } from 'react';
import { View, Text, StyleSheet, TouchableHighlight, Image } from 'react-native';

import vars from '../vars';

const icon = require('../icons/radio.png');
const iconChecked = require('../icons/radio-checked.png');

export default class Radio extends PureComponent {
  onPress = () => {
    if (this.props.checked) {
      return;
    }

    this.props.onChange && this.props.onChange(!this.props.checked, this.props.id);
  };

  render() {
    const { label, checked, customStyles = {} } = this.props;

    return (
      <TouchableHighlight
        underlayColor="transparent"
        activeOpacity={1}
        onPress={this.onPress}
        style={[styles.container, customStyles.container]}
      >
        <View style={styles.inner}>
          <Image source={checked ? iconChecked : icon} />
          {label && (
            <Text style={styles.label}>{label}</Text>
          )}
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    height: 48,
    justifyContent: 'center',
  },
  inner: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    color: vars.color.black,
    marginLeft: 16,
  },
});
