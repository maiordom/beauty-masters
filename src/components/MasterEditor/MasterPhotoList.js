import React, { Component } from 'react';
import chunk from 'lodash/chunk';
import compact from 'lodash/compact';
import {
  Image,
  Platform,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import { MasterPhotoUpload } from './MasterPhotoUpload';

import vars from '../../vars';
import constants from '../../constants/Master';

const icons = {
  remove: Platform.select({
    android: require('../../icons/android/remove.png'),
  }),
};

const CHUNK_SIZE = 3;

export default class MasterPhotoList extends Component {
  onPhotoSelectPress = () => {
    this.props.onPhotoSelectPress(this.props.modelName);
  };

  onPhotoRemovePress = (id, type) => {
    this.props.onPhotoRemovePress(id, this.props.modelName, type);
  };

  render() {
    const {
      items,
      limit,
      photoSize,
      type,
      wrapperPhotoSize,
      placeholderIconType,
    } = this.props;

    const photoUploadSelect = items.length < limit ? { type: 'select' } : null;
    const photosArray = compact([...items, photoUploadSelect]);
    const photosChunks = chunk(photosArray, CHUNK_SIZE);

    return (
      <View>
        {photosChunks.map((chunk, index) => (
          <View key={index} style={styles.photos}>
            {chunk.map((item, index) => {
              if (item.type === 'select') {
                return (<MasterPhotoUpload
                  key={index}
                  onPress={this.onPhotoSelectPress}
                  photoSize={photoSize}
                  wrapperPhotoSize={wrapperPhotoSize}
                  placeholderIconType={placeholderIconType}
                />);
              }

              if (item.type === 'mock') {
                return (
                  <View
                    key={index}
                    style={[
                      styles.mock,
                      styles.photo,
                      index === CHUNK_SIZE - 1 && styles.photoLast,
                      { width: photoSize, height: photoSize },
                    ]}
                  >
                    {item.status === constants.UPLOAD_STATUS.IN_PROCESS && (
                      <Text>Загружается</Text>
                    )}
                    {item.status === constants.UPLOAD_STATUS.IN_QUEUE && (
                      <Text>В очереди</Text>
                    )}
                    {item.status === constants.UPLOAD_STATUS.ERROR && (
                      <Text>Ошибка</Text>
                    )}
                  </View>
                );
              }

              return (
                <View
                  key={index}
                  style={[
                    styles.photo,
                    index === CHUNK_SIZE - 1 && styles.photoLast,
                    { width: wrapperPhotoSize, height: wrapperPhotoSize },
                  ]}
                >
                  <Image
                    source={{ uri: item.sizes.s }}
                    style={[{ width: photoSize, height: photoSize }, styles.image]}
                  />
                  <TouchableWithoutFeedback onPress={() => this.onPhotoRemovePress(item.id, type)}>
                    <Image source={icons.remove} style={styles.icon} />
                  </TouchableWithoutFeedback>
                </View>
              );
            })}
          </View>
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  image: {
    ...Platform.select({
      ios: {
        borderRadius: 4,
      },
    }),
  },
  mock: {
    backgroundColor: vars.color.grey,
    justifyContent: 'center',
    alignItems: 'center',
  },
  photos: {
    flexDirection: 'row',
  },
  photo: {
    marginRight: 8,
    marginBottom: 8,
  },
  photoLast: {
    marginRight: 0,
  },
  icon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
});
