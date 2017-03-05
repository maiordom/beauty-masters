import React, { Component } from 'react';
import { View, Image, StyleSheet, Text, TouchableWithoutFeedback } from 'react-native';
import ImagePicker from 'react-native-image-picker';

import i18n from '../i18n';
import vars from '../vars';
import { hexToRgba } from '../utils';

const takeIcon = require('../icons/android/photo-take.png');
const selectIcon = require('../icons/android/photo-select.png');

export default class PhotoSelect extends Component {
  onPhotoTakePress = () => {
    ImagePicker.launchCamera({}, response => {
      console.log(response);
    });
  };

  onPhotoSelectPress = () => {
    ImagePicker.launchImageLibrary({}, response => {
      console.log(response);
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inner}>
          <TouchableWithoutFeedback onPress={this.onPhotoTakePress}>
            <View style={styles.button}>
              <Image style={styles.image} source={takeIcon} />
              <Text style={styles.buttonText}>{i18n.photo.take}</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={this.onPhotoSelectPress}>
            <View style={styles.button}>
              <Image style={styles.image} source={selectIcon} />
              <Text style={styles.buttonText}>{i18n.photo.select}</Text>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  inner: {
    backgroundColor: vars.color.white,
  },
  image: {
    marginLeft: 16,
    marginRight: 32,
  },
  button: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: hexToRgba(vars.color.black, 54),
  },
});
