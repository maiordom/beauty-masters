import React, { Component, PropTypes } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';

import Input from '../Input';
import Label from '../Label';
import Switch from '../Switch';
import { SubLabel } from '../SubLabel';
import MasterPhotoList from '../MasterEditor/MasterPhotoList';
import ButtonControl from '../ButtonControl';

import i18n from '../../i18n';

const DEVICE_WIDTH = Dimensions.get('window').width;
const PAGE_SPACE = 16;
const PHOTO_SPACE = 8;
const PHOTO_INNER_SPACE = 6;
const WRAPPER_PHOTO_SIZE = (DEVICE_WIDTH - PAGE_SPACE * 2 - PHOTO_SPACE * 2) / 3;
const PHOTO_SIZE = (DEVICE_WIDTH - PAGE_SPACE * 2 - (PHOTO_SPACE + PHOTO_INNER_SPACE) * 2) / 3;

export default class MasterEditorInfo extends Component {
  state = { certificatesShow: false };

  static propTypes = {
    actions: PropTypes.object,
    certificatePhotos: PropTypes.object,
    drawerOpen: PropTypes.func,
    passportPhotos: PropTypes.object,
    personalPhotos: PropTypes.object,
    workPhotos: PropTypes.object,
  };

  onPhotoSelectPress = modelName => {
    this.props.drawerOpen({ contentKey: 'PhotoMaster', ...{ name: modelName } });
  };

  onCertificatesChange = state => {
    this.setState({ certificatesShow: Boolean(state) });
  };

  onPhotoRemovePress = (itemId, modelName) => {
    this.props.actions.removePhoto(itemId, modelName);
  };

  onNextPress = () => {
    this.props.actions.createMaster();
  };

  render() {
    const {
      certificatePhotos,
      passportPhotos,
      personalPhotos,
      workPhotos,
    } = this.props;

    const { certificatesShow } = this.state;

    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.scrollViewInner}>
            <Label
              text={i18n.masterEditor.informationAboutYou}
              subText={i18n.masterEditor.aboutDescription}
            />
            <MasterPhotoList
              onPhotoRemovePress={this.onPhotoRemovePress}
              onPhotoSelectPress={this.onPhotoSelectPress}
              photoSize={PHOTO_SIZE}
              wrapperPhotoSize={WRAPPER_PHOTO_SIZE}
              {...personalPhotos}
            />
            <Label text={i18n.masterEditor.fewWordsAboutYouToClients} customStyle={{ paddingBottom: 0 }} />
            <Input placeholder={i18n.masterEditor.aboutExample} />
            <Switch title={i18n.masterEditor.certificates} onChange={this.onCertificatesChange} />
            {certificatesShow && (
              <View style={styles.photosWrapper}>
                <SubLabel
                  customStyle={styles.photosLabel}
                  label={i18n.masterEditor.attachPhotosToConfirmCertificates}
                />
                <MasterPhotoList
                  onPhotoRemovePress={this.onPhotoRemovePress}
                  onPhotoSelectPress={this.onPhotoSelectPress}
                  photoSize={PHOTO_SIZE}
                  wrapperPhotoSize={WRAPPER_PHOTO_SIZE}
                  {...certificatePhotos}
                />
              </View>
            )}
            <View style={styles.photosWrapper}>
              <SubLabel
                customStyle={styles.photosLabel}
                label={i18n.masterEditor.needFirstPhotoOfYourPassport}
              />
              <MasterPhotoList
                onPhotoRemovePress={this.onPhotoRemovePress}
                onPhotoSelectPress={this.onPhotoSelectPress}
                photoSize={PHOTO_SIZE}
                wrapperPhotoSize={WRAPPER_PHOTO_SIZE}
                {...passportPhotos}
              />
            </View>
            <View style={styles.photosWrapper}>
              <SubLabel
                customStyle={styles.photosLabel}
                label={i18n.masterEditor.attachPhotosOfYourWork}
              />
              <MasterPhotoList
                onPhotoRemovePress={this.onPhotoRemovePress}
                onPhotoSelectPress={this.onPhotoSelectPress}
                photoSize={PHOTO_SIZE}
                wrapperPhotoSize={WRAPPER_PHOTO_SIZE}
                {...workPhotos}
              />
            </View>
          </View>
          <ButtonControl onPress={this.onNextPress} />
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
  scrollViewInner: {
    paddingLeft: 16,
    paddingRight: 16,
  },
  container: {}
});
