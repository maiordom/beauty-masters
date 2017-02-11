import React, { Component } from 'react';
import { TouchableHighlight, Image, Platform, StyleSheet } from 'react-native';

const checkboxIcon = Platform.select({
  ios: require('../icons/ios/checkbox.png'),
  android: require('../icons/android/checkbox.png')
});

const checkboxCheckedIcon = Platform.select({
  ios: require('../icons/ios/checkbox-checked.png'),
  android: require('../icons/android/checkbox-checked.png')
});

export default class Checkbox extends Component {
  constructor(props) {
    super();

    this.state = {
      checked: Boolean(props.checked)
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

    return (
      <TouchableHighlight
        underlayColor='transparent'
        activeOpacity={1}
        onPress={this.onPress}
        style={styles.container}
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
    justifyContent: 'center'
  }
});
