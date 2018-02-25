import React, { PureComponent } from 'react';
import {
  Platform,
  Image,
  StyleSheet,
  Text,
  TouchableHighlight,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import ImagePicker from 'react-native-image-picker';

import i18n from '../i18n';
import vars from '../vars';
import { hexToRgba } from '../utils';
import { log } from '../utils/Log';

const icons = {
  close: require('../icons/close.png'),
  take: Platform.select({
    android: require('../icons/android/photo-take.png'),
  }),
  select: Platform.select({
    android: require('../icons/android/photo-select.png'),
  }),
};

export default class PhotoSelect extends PureComponent {
  onClosePress = () => {
    this.props.onRequestClose();
  };

  onPhotoTakePress = () => {
    ImagePicker.launchCamera({
      maxWidth: 1000,
      maxHeight: 1000,
      noData: true,
      storageOptions: {
        cameraRoll: false,
        skipBackup: true,
        waitUntilSaved: true,
      },
    }, ({
      uri, type, didCancel, error,
    }) => {
      if (didCancel) {
        log('ImagePicker::launchCamera cancel');
        return;
      }

      if (error) {
        log('ImagePicker::launchCamera::error', error);
        return;
      }

      this.props.actions.uploadMasterPhoto({ uri, type }, this.props.name);
    });
  };

  onPhotoSelectPress = () => {
    ImagePicker.launchImageLibrary({
      maxWidth: 1000,
      maxHeight: 1000,
      noData: true,
      storageOptions: {
        cameraRoll: false,
        skipBackup: true,
        waitUntilSaved: true,
      },
    }, ({
      uri, type, didCancel, error, width, height, fileSize
    }) => {
      if (didCancel) {
        log('ImagePicker::launchImageLibrary cancel');
        return;
      }

      if (error) {
        log('ImagePicker::launchImageLibrary::error', error);
        return;
      }

      log('ImagePicker::image::width', width);
      log('ImagePicker::image::height', height);
      log('ImagePicker::image::fileSize', fileSize);

      this.props.actions.uploadMasterPhoto({ uri, type }, this.props.name);
    });
  };

  render() {
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={this.onClosePress}>
          <View style={styles.close}>
            <Image source={icons.close} />
          </View>
        </TouchableWithoutFeedback>
        <View style={styles.inner}>
          <TouchableWithoutFeedback onPress={this.onPhotoTakePress}>
            <View style={styles.button}>
              <Image style={styles.image} source={icons.take} />
              <Text style={styles.buttonText}>{i18n.photo.take}</Text>
            </View>
          </TouchableWithoutFeedback>
          <TouchableWithoutFeedback onPress={this.onPhotoSelectPress}>
            <View style={styles.button}>
              <Image style={styles.image} source={icons.select} />
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
    alignSelf: 'stretch',
    justifyContent: 'flex-end',
  },
  inner: {
    backgroundColor: vars.color.white,
  },
  close: {
    position: 'absolute',
    top: 0,
    right: 0,
    padding: 15,
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
