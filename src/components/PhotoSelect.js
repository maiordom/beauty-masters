import React, { Component, PropTypes } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';

import i18n from '../i18n';
import vars from '../vars';
import { hexToRgba } from '../utils';

const takeIcon = require('../icons/android/photo-take.png');
const selectIcon = require('../icons/android/photo-select.png');

export default class PhotoSelect extends Component {
  static propTypes = {
    onGetPhotoFromCamera: PropTypes.func,
    onGetPhotoFromGallery: PropTypes.func,
  };

  onPhotoTakePress = () => {
    ImagePicker.launchCamera({
      noData: true,
      storageOptions: {
        cameraRoll: true,
        waitUntilSaved: true,
      },
    }, ({ uri, type, didCancel, error }) => {
      if (didCancel) {
        console.log('ImagePicker::launchCamera cancel');
        return;
      }

      if (error) {
        console.log('ImagePicker::launchCamera::error', error);
        return;
      }

      this.props.onGetPhotoFromCamera({ uri, type }, this.props.name);
    });
  };

  onPhotoSelectPress = () => {
    ImagePicker.launchImageLibrary({
      noData: true,
      storageOptions: {
        waitUntilSaved: true,
      },
    }, ({ uri, type, didCancel, error }) => {
      if (didCancel) {
        console.log('ImagePicker::launchImageLibrary cancel');
        return;
      }

      if (error) {
        console.log('ImagePicker::launchImageLibrary::error', error);
        return;
      }

      this.props.onGetPhotoFromGallery({ uri, type }, this.props.name);
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
