import React, { Component, PropTypes } from 'react';
import chunk from 'lodash/chunk';
import compact from 'lodash/compact';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, Image } from 'react-native';
import { drawerOpen } from '../../actions/drawer';

import Label from '../../components/Label';
import { MasterPhotoUpload } from '../../components/MasterPhotoUpload';

import i18n from '../../i18n';

class MasterEditorInfo extends Component {
  static propTypes = {
    personalPhotos: PropTypes.array,
    personalPhotosLimit: PropTypes.number,
  };

  onPhotoSelectPress = () => {
    drawerOpen({contentKey: 'PhotoMaster'});
  };

  render() {
    const { personalPhotos } = this.props;
    const photoUploadSelect = personalPhotos.length < 5 ? {type: 'select'} : null;
    const personalPhotosArray = compact([...personalPhotos, photoUploadSelect]);
    const personalPhotosChunks = chunk(personalPhotosArray, 3);

    return (
      <View style={styles.container}>
        <Label text={i18n.masterEditor.informationAboutYou} subText={i18n.masterEditor.aboutDescription} />
        {personalPhotosChunks.map((chunk, index) => (
          <View key={index} style={styles.photos}>
            {chunk.map((photo, index) => {
              if (photo.type === 'select') {
                return <MasterPhotoUpload key={index} onPress={this.onPhotoSelectPress} />;
              }

              return <Image key={index} style={styles.photo} source={{uri: photo.mediaUrl + photo.sizes.s}} />
            })}
          </View>
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  photos: {
    flexDirection: 'row',
  },
  photo: {
    width: 100,
    height: 100,
    marginRight: 14,
    marginBottom: 14,
  },
  container: {
    paddingLeft: 16,
    paddingRight: 16,
  }
});

export default connect(state => ({
  personalPhotos: state.masterEditor.personalPhotos,
  personalPhotosLimit: state.masterEditor.personalPhotosLimit,
}))(MasterEditorInfo);
