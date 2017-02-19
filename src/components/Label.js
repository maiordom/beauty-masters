import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';

import vars from '../vars';

export default class Label extends Component {
  render() {
    const { text, subText } = this.props;

    return (
      <View style={styles.container}>
        <Text style={styles.text}>{text}</Text>
        {subText && (
          <Text style={styles.subText}>{subText}</Text>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    marginLeft: 16,
    paddingTop: 16,
    paddingBottom: 16,
  },
  text: {
    fontSize: 20,
    color: vars.color.black,
  },
  subText: {
    marginTop: 7,
    fontSize: 14,
    color: vars.color.grey,
  }
});