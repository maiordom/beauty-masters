import React, { PureComponent } from 'react';
import { Image, TouchableWithoutFeedback, StyleSheet, Platform, View } from 'react-native';

const uploadIcon = require('../../icons/android/photo-icon.png');

const addIcon = Platform.select({
  android: require('../../icons/android/add.png'),
});

export const MasterPhotoUpload = ({ onPress, photoSize, wrapperPhotoSize }) => (
  <TouchableWithoutFeedback onPress={onPress}>
    <View style={{ width: wrapperPhotoSize, height: wrapperPhotoSize }}>
      <Image source={uploadIcon} style={{ width: photoSize, height: photoSize }} />
      <Image source={addIcon} style={styles.icon} />
    </View>
  </TouchableWithoutFeedback>
);

const styles = StyleSheet.create({
  icon: {
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
});

export default MasterPhotoUpload;
