// @flow

import React from 'react';
import { TouchableHighlight, StyleSheet, Platform, View, Text } from 'react-native';

import vars from '../vars';

type TProps = {
  title: string,
  onPress: () => void,
};

export const ButtonPanel = ({ title, onPress }: TProps) => {
  title = Platform.select({
    ios: title,
    android: title.toUpperCase(),
  });

  return (
    <TouchableHighlight onPress={onPress} underlayColor="transparent">
      <View style={styles.container}>
        <Text style={styles.text}>{title}</Text>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch',
    borderTopColor: vars.color.borderColorAndroid,
    borderTopWidth: 1,
    ...Platform.select({
      android: {
        height: 48,
        justifyContent: 'center',
        alignItems: 'center',
      },
    }),
  },
  text: {
    color: vars.color.red,
  },
});

export default ButtonPanel;
