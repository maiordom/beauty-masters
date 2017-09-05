// @flow

import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, Dimensions } from 'react-native';

import { SubLabel } from '../SubLabel';
import ActivityIndicator from '../../containers/ActivityIndicator';
import ButtonControl from '../ButtonControl';
import Input from '../Input';
import Label from '../Label';
import MasterPhotoList from '../MasterEditor/MasterPhotoList';
import Switch from '../Switch';

import i18n from '../../i18n';

const DEVICE_WIDTH = Dimensions.get('window').width;
const PAGE_SPACE = 16;
const PHOTO_SPACE = 8;
const PHOTO_INNER_SPACE = 6;
const WRAPPER_PHOTO_SIZE = (DEVICE_WIDTH - PAGE_SPACE * 2 - PHOTO_SPACE * 2) / 3;
const PHOTO_SIZE = (DEVICE_WIDTH - PAGE_SPACE * 2 - (PHOTO_SPACE + PHOTO_INNER_SPACE) * 2) / 3;

type TProps = {
  aboutField: Object,
  actions: Object,
  certificatePhotos: Object,
  personalPhotos: Object,
  sectionName: string,
  workPhotos: Object,
};

type TState = {
  certificatesShow: boolean,
};

export default class MasterEditorInfo extends Component<TProps, TState> {
  state = { certificatesShow: false };

  onPhotoSelectPress = (modelName: string) => {
    this.props.actions.drawerOpen({ contentKey: 'PhotoMaster', name: modelName });
  };

  onCertificatesChange = (state: boolean) => {
    this.setState({ certificatesShow: Boolean(state) });
  };

  onPhotoRemovePress = (itemId: number, modelName: string) => {
    this.props.actions.removePhoto(itemId, modelName);
  };

  onChangeAbout = (value: string, modelName: string) => {
    this.props.actions.setGeneralParam(modelName, value, this.props.sectionName);
  }

  onNextPress = () => {
    this.props.actions.createMaster().then((res) => {
      if (res.result === 'success') {
        this.props.actions.next();
      }
    });
  }

  render() {
    const {
      aboutField,
      certificatePhotos,
      personalPhotos,
      workPhotos,
    } = this.props;

    const { certificatesShow } = this.state;

    return (
      <View style={styles.container}>
        <ActivityIndicator position="absolute" />
        <ScrollView style={styles.inner}>
          <View style={styles.scrollViewInner}>
            <Label
              text={i18n.masterEditor.informationAboutYou}
              subText={i18n.masterEditor.aboutDescription}
            />
            <MasterPhotoList
              {...personalPhotos}
              onPhotoRemovePress={this.onPhotoRemovePress}
              onPhotoSelectPress={this.onPhotoSelectPress}
              photoSize={PHOTO_SIZE}
              wrapperPhotoSize={WRAPPER_PHOTO_SIZE}
            />
            <Label
              text={i18n.masterEditor.fewWordsAboutYouToClients}
              customStyle={{ paddingBottom: 0 }}
            />
            <Input
              {...aboutField}
              debounce
              onChange={this.onChangeAbout}
            />
            <Switch
              title={i18n.masterEditor.certificates}
              onChange={this.onCertificatesChange}
            />
            {certificatesShow && (
              <View style={styles.photosWrapper}>
                <SubLabel
                  customStyle={styles.photosLabel}
                  label={i18n.masterEditor.attachPhotosToConfirmCertificates}
                />
                <MasterPhotoList
                  {...certificatePhotos}
                  onPhotoRemovePress={this.onPhotoRemovePress}
                  onPhotoSelectPress={this.onPhotoSelectPress}
                  photoSize={PHOTO_SIZE}
                  wrapperPhotoSize={WRAPPER_PHOTO_SIZE}
                />
              </View>
            )}
            <View style={styles.photosWrapper}>
              <SubLabel
                customStyle={styles.photosLabel}
                label={i18n.masterEditor.attachPhotosOfYourWork}
              />
              <MasterPhotoList
                {...workPhotos}
                onPhotoRemovePress={this.onPhotoRemovePress}
                onPhotoSelectPress={this.onPhotoSelectPress}
                photoSize={PHOTO_SIZE}
                wrapperPhotoSize={WRAPPER_PHOTO_SIZE}
              />
            </View>
          </View>
        </ScrollView>
        <ButtonControl onPress={this.onNextPress} />
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
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
  },
});
