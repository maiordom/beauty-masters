import React, { Component } from 'react';
import chunk from 'lodash/chunk';
import compact from 'lodash/compact';
import {
  ActivityIndicator,
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
import { hexToRgba } from '../../utils';

const icons = {
  remove: Platform.select({
    android: require('../../icons/android/remove.png'),
    ios: require('../../icons/ios/remove.png'),
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
                    {item.status === constants.UPLOAD_STATUS.IN_PROCESS && Platform.select({
                      android: (<Text>Загружается</Text>),
                      ios: (
                        <View style={styles.mockContainer}>
                          <ActivityIndicator animating color={vars.color.white} size="large" />
                        </View>
                      ),
                    })}
                    {item.status === constants.UPLOAD_STATUS.IN_QUEUE && Platform.select({
                      android: (<Text>В очереди</Text>),
                      ios: (
                        <View style={styles.mockContainer}>
                          <ActivityIndicator animating color={vars.color.white} size="large" />
                        </View>
                      ),
                    })}
                    {item.status === constants.UPLOAD_STATUS.ERROR && Platform.select({
                      android: (<Text>Ошибка</Text>),
                      ios: (
                        <View style={styles.mockContainer}>
                          <Text style={styles.errorTitle}>Ошибка</Text>
                        </View>
                      ),
                    })}
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
  errorTitle: {
    color: vars.color.lightGrey,
  },
  image: {
    ...Platform.select({
      ios: {
        borderRadius: 4,
      },
    }),
  },
  mock: {
    ...Platform.select({
      android: {
        backgroundColor: vars.color.grey,
        justifyContent: 'center',
        alignItems: 'center',
      },
    }),
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
  mockContainer: {
    flex: 1,
    borderRadius: 4,
    backgroundColor: hexToRgba(vars.color.black, 60),
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    position: 'absolute',
    ...Platform.select({
      android: {
        bottom: 0,
        right: 0,
      },
      ios: {
        bottom: -6,
        right: -6,
      },
    }),
  },
});
