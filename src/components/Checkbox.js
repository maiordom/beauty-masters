import React, { Component } from 'react';
import { TouchableHighlight, Image, Platform, StyleSheet } from 'react-native';

const checkboxIcon = Platform.select({
  ios: require('../icons/ios/checkbox.png'),
  android: require('../icons/android/checkbox.png'),
});

const checkboxCheckedIcon = Platform.select({
  ios: require('../icons/ios/checkbox-checked.png'),
  android: require('../icons/android/checkbox-checked.png'),
});

export default class Checkbox extends Component {
  onPress = () => {
    this.props.onPress && this.props.onPress(!this.props.checked);
  };

  render() {
    const { checked, customStyles = {} } = this.props;

    return (
      <TouchableHighlight
        underlayColor="transparent"
        activeOpacity={1}
        onPress={this.onPress}
        style={[styles.container, customStyles.container]}
      >
        <Image source={checked ? checkboxCheckedIcon : checkboxIcon} />
      </TouchableHighlight>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
