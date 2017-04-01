import React, { Component } from 'react';
import { Image, TouchableWithoutFeedback } from 'react-native';

const uploadIcon = require('../../icons/android/photo-upload@2x.png');

export const MasterPhotoUpload = ({ onPress, size }) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Image source={uploadIcon} style={{width: size, height: size}} />
    </TouchableWithoutFeedback>
  );
}
