import React, { Component } from 'react';
import chunk from 'lodash/chunk';
import compact from 'lodash/compact';
import {
  View,
  StyleSheet,
  Image,
  Dimensions,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native';

import MasterPhotoUpload from './MasterPhotoUpload';

import vars from '../../vars';

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

  onPhotoRemovePress = itemId => {
    this.props.onPhotoRemovePress(itemId, this.props.modelName);
  };

  render() {
    const { items, limit, photoSize, wrapperPhotoSize } = this.props;
    const photoUploadSelect = items.length < limit ? { type: 'select' } : null;
    const photosArray = compact([...items, photoUploadSelect]);
    const photosChunks = chunk(photosArray, CHUNK_SIZE);

    return (
      <View>
        {photosChunks.map((chunk, index) => (
          <View key={index} style={styles.photos}>
            {chunk.map((item, index) => {
              if (item.type === 'select') {
                return (
                  <MasterPhotoUpload
                    key={index}
                    onPress={this.onPhotoSelectPress}
                    photoSize={photoSize}
                    wrapperPhotoSize={wrapperPhotoSize}
                  />
                );
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
                  />
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
                    source={{ uri: item.mediaUrl + item.sizes.s }}
                    style={{ width: photoSize, height: photoSize }}
                  />
                  <TouchableWithoutFeedback
                    onPress={() => this.onPhotoRemovePress(item.id)}
                  >
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
