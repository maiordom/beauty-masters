import React from 'react';
import { Image, TouchableWithoutFeedback, StyleSheet, Platform, View } from 'react-native';

import vars from '../../vars';
import { hexToRgba } from '../../utils';

const placeholderIcons = Platform.select({
  android: {
    user: require('../../icons/android/photo-icon.png'),
  },
  ios: {
    user: require('../../icons/ios/photo-icon.png'),
    item: require('../../icons/ios/scan-icon.png'),
  },
});

const addIcon = Platform.select({
  android: require('../../icons/android/add.png'),
  ios: require('../../icons/ios/add.png'),
});

export const PLACEHOLDER_ICON_TYPE = {
  PLACEHOLDER_ICON_TYPE_USER: 'PLACEHOLDER_ICON_TYPE_USER',
  PLACEHOLDER_ICON_TYPE_ITEM: 'PLACEHOLDER_ICON_TYPE_ITEM',
};

export const MasterPhotoUpload = ({
  onPress,
  photoSize,
  wrapperPhotoSize,
  placeholderIconType,
}) => {
  let uploadIcon = placeholderIcons.user;
  if (Platform.OS === 'ios' && placeholderIconType === PLACEHOLDER_ICON_TYPE.PLACEHOLDER_ICON_TYPE_ITEM) {
    uploadIcon = placeholderIcons.item;
  }
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View
        style={[{ width: wrapperPhotoSize, height: wrapperPhotoSize }, styles.wrapper]}
      >
        <Image source={uploadIcon}
          style={Platform.select({
            android: { width: photoSize, height: photoSize },
          })}
        />
        <Image source={addIcon} style={styles.icon} />
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  icon: {
    position: 'absolute',
    ...Platform.select({
      android: {
        right: 0,
        bottom: 0,
      },
      ios: {
        right: -6,
        bottom: -6,
      },
    }),
  },
  wrapper: {
    ...Platform.select({
      ios: {
        borderRadius: 4,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: vars.color.grayBlue,
        borderWidth: 1,
        backgroundColor: hexToRgba(vars.color.grayBlue, 0.1),
      },
    }),
  },
});
