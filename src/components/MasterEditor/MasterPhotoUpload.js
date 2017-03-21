import React, { Component } from 'react';
import { Image, TouchableWithoutFeedback } from 'react-native';

const uploadIcon = require('../../icons/android/photo-upload@2x.png');

const OVER_SIZE = 8;

export const MasterPhotoUpload = ({ onPress, size }) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <Image source={uploadIcon} style={{width: size + OVER_SIZE, height: size + OVER_SIZE}} />
    </TouchableWithoutFeedback>
  );
}
