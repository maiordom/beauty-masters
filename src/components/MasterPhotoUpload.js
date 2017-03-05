import React, { Component } from 'react';
import { Image, TouchableWithoutFeedback } from 'react-native';

const uploadIcon = require('../icons/android/photo-upload.png');

export const MasterPhotoUpload = ({ onPress }) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Image source={uploadIcon} />
    </TouchableWithoutFeedback>
  );
}
