// @flow

import React, { PureComponent } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';

import vars from '../vars';
import i18n from '../i18n';

type TProps = {
  title: string,
  hasCloseButton: boolean,
  hasAcceptButton: boolean,
  onCloseButtonPress: () => void,
  onAcceptButtonPress: () => void,
};

export default class PopupHeader extends PureComponent<TProps, void> {
  static defaultProps = {
    title: '',
    hasCloseButton: true,
    hasAcceptButton: false,
    onCloseButtonPress: () => {},
    onAcceptButtonPress: () => {},
  };

  render() {
    const {
      title,
      hasCloseButton,
      hasAcceptButton,
      onCloseButtonPress,
      onAcceptButtonPress,
    } = this.props;

    return (
      <View style={styles.container}>
        {hasCloseButton && (
          <TouchableOpacity style={styles.button} onPress={onCloseButtonPress}>
            <Text style={styles.buttonTitle}>{i18n.cancel}</Text>
          </TouchableOpacity>
        )}
        <View style={styles.flexStub} />
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            {title}
          </Text>
        </View>
        {hasAcceptButton && (
          <TouchableOpacity style={styles.button} onPress={onAcceptButtonPress}>
            <Text style={styles.buttonTitle}>{i18n.done}</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    paddingLeft: 16,
    paddingRight: 16,
    paddingTop: 2,
  },
  buttonTitle: {
    color: vars.color.buttonBlue,
    fontWeight: '600',
    fontSize: 15,
  },
  container: {
    height: 44,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: vars.color.cellSeparatorColorIOS,
    borderBottomWidth: 1,
    borderBottomColor: vars.color.cellSeparatorColorIOS,
  },
  flexStub: {
    flexGrow: 1,
  },
  titleContainer: {
    position: 'absolute',
    left: 36,
    top: 0,
    right: 36,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
    textAlign: 'center',
  },
});
