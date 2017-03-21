import React, { Component, PropTypes } from 'react';
import chunk from 'lodash/chunk';
import compact from 'lodash/compact';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';

import { drawerOpen } from '../../actions/drawer';

import Input from '../../components/Input';
import Label from '../../components/Label';
import Switch from '../../components/Switch';
import { SubLabel } from '../../components/SubLabel';
import MasterPhotoList from '../../components/MasterEditor/MasterPhotoList';

import i18n from '../../i18n';

const DEVICE_WIDTH = Dimensions.get('window').width;
const PHOTO_SIZE = (DEVICE_WIDTH - 16 * 2 - 14 * 2) / 3;

class MasterEditorInfo extends Component {
  static propTypes = {
    personalPhotos: PropTypes.array,
    personalPhotosLimit: PropTypes.number,
  };

  constructor() {
    super();

    this.state = {certificatesShow: false};
  }

  onPhotoSelectPress = props => {
    drawerOpen({contentKey: 'PhotoMaster', ...props});
  };

  onCertificatesChange = state => {
    this.setState({certificatesShow: Boolean(state)});
  };

  render() {
    const {
      personalPhotos,
      personalPhotosLimit,
      certificatePhotos,
      certificatePhotosLimit,
      passportPhotos,
      passportPhotosLimit,
      workPhotos,
      workPhotosLimit,
    } = this.props;

    const { certificatesShow } = this.state;

    return (
      <View style={styles.container}>
        <ScrollView style={styles.scrollView}>
          <Label text={i18n.masterEditor.informationAboutYou} subText={i18n.masterEditor.aboutDescription} />
          <MasterPhotoList
            photoSize={PHOTO_SIZE}
            items={personalPhotos}
            limit={personalPhotosLimit}
            onPhotoSelectPress={() => this.onPhotoSelectPress({name: 'personalPhotos'})}
          />
          <Label text={i18n.masterEditor.fewWordsAboutYouToClients} customStyle={{paddingBottom: 0}} />
          <Input placeholder={i18n.masterEditor.aboutExample} />
          <Switch title={i18n.masterEditor.certificates} onChangeState={this.onCertificatesChange} />
          {certificatesShow && (
            <View style={styles.photosWrapper}>
              <SubLabel customStyle={styles.photosLabel} label={i18n.masterEditor.attachPhotosToConfirmCertificates} />
              <MasterPhotoList
                photoSize={PHOTO_SIZE}
                items={certificatePhotos}
                limit={certificatePhotosLimit}
                onPhotoSelectPress={() => this.onPhotoSelectPress({name: 'certificatePhotos'})}
              />
            </View>
          )}
          <View style={styles.photosWrapper}>
            <SubLabel customStyle={styles.photosLabel} label={i18n.masterEditor.needFirstPhotoOfYourPassport} />
            <MasterPhotoList
              photoSize={PHOTO_SIZE}
              items={passportPhotos}
              limit={passportPhotosLimit}
              onPhotoSelectPress={() => this.onPhotoSelectPress({name: 'passportPhotos'})}
            />
          </View>
          <View style={styles.photosWrapper}>
            <SubLabel customStyle={styles.photosLabel} label={i18n.masterEditor.attachPhotosOfYourWork} />
            <MasterPhotoList
              photoSize={PHOTO_SIZE}
              items={workPhotos}
              limit={workPhotosLimit}
              onPhotoSelectPress={() => this.onPhotoSelectPress({name: 'workPhotos'})}
            />
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  photosLabel: {
    marginBottom: 8,
  },
  photosWrapper: {
    marginBottom: 26,
  },
  scrollView: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  container: {}
});

export default connect(state => {
  const {
    personalPhotos,
    personalPhotosLimit,
    certificatePhotos,
    certificatePhotosLimit,
    passportPhotos,
    passportPhotosLimit,
    workPhotos,
    workPhotosLimit,
  } = state.masterEditor;

  return {
    personalPhotos,
    personalPhotosLimit,
    certificatePhotos,
    certificatePhotosLimit,
    passportPhotos,
    passportPhotosLimit,
    workPhotos,
    workPhotosLimit,
  };
})(MasterEditorInfo);
