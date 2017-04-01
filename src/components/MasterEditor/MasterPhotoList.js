import React, { Component } from 'react';
import chunk from 'lodash/chunk';
import compact from 'lodash/compact';
import { connect } from 'react-redux';
import { View, StyleSheet, Image, Dimensions } from 'react-native';
import * as Progress from 'react-native-progress';

import { MasterPhotoUpload } from './MasterPhotoUpload';

import vars from '../../vars';

export default class MasterPhotoList extends Component {
  onPhotoSelectPress = () => {
    this.props.onPhotoSelectPress && this.props.onPhotoSelectPress();
  };

  render() {
    const { items, limit, photoSize } = this.props;
    const photoUploadSelect = items.length < limit ? {type: 'select'} : null;
    const photosArray = compact([...items, photoUploadSelect]);
    const photosChunks = chunk(photosArray, 3);

    return (
      <View>
        {photosChunks.map((chunk, index) => (
          <View key={index} style={styles.photos}>
            {chunk.map((photo, index) => {
              if (photo.type === 'select') {
                return <MasterPhotoUpload size={photoSize} key={index} onPress={this.onPhotoSelectPress} />;
              }

              if (photo.type === 'mock') {
                return <View
                  key={index}
                  style={[styles.mock, styles.photo, {width: photoSize, height: photoSize}]}>
                  <Progress.Circle
                    thickness={6}
                    size={30}
                    indeterminate={true}
                  />
                </View>;
              }

              return <Image
                key={index}
                style={[styles.photo, {width: photoSize, height: photoSize}]}
                source={{uri: photo.mediaUrl + photo.sizes.s}}
              />
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
    marginRight: 14,
    marginBottom: 14,
  },
});