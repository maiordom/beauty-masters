// @flow

import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, Dimensions, Platform } from 'react-native';

import { SubLabel } from '../SubLabel';
import ActivityIndicator from '../../containers/ActivityIndicator';
import ButtonControl from '../ButtonControl';
import Input from '../Input';
import Label from '../Label';
import MasterPhotoList from '../MasterEditor/MasterPhotoList';
import Switch from '../Switch';

import i18n from '../../i18n';
import { trackEvent } from '../../utils/Tracker';

const DEVICE_WIDTH = Dimensions.get('window').width;
const PAGE_SPACE = 16;
const PHOTO_SPACE = 8;
const PHOTO_INNER_SPACE = 6;
const WRAPPER_PHOTO_SIZE = (DEVICE_WIDTH - PAGE_SPACE * 2 - PHOTO_SPACE * 2) / 3;
const PHOTO_SIZE = (DEVICE_WIDTH - PAGE_SPACE * 2 - (PHOTO_SPACE + PHOTO_INNER_SPACE) * 2) / 3;

const localization = {
  save: Platform.select({
    ios: i18n.save,
    android: i18n.save.toUpperCase(),
  }),
};

type TProps = {
  aboutField: Object,
  actions: Object,
  cardType: string,
  certificatePhotos: Object,
  editStatus: Object,
  isSalon: boolean,
  masterCardId: number | null,
  personalPhotos: Object,
  sectionName: string,
  workPhotos: Object,
};

type TState = {
  certificatesShow: boolean,
};

export default class MasterEditorInfo extends Component<TProps, TState> {
  state = { certificatesShow: false };

  componentDidMount() {
    if (this.props.cardType === 'edit' && this.props.editStatus.photos === 'required') {
      this.props.actions.getPhotos(this.props.masterCardId);
    }
  }

  onPhotoSelectPress = (modelName: string) => {
    this.props.actions.drawerOpen({
      contentKey: 'PhotoMaster',
      drawerParams: {
        panCloseMask: 0,
      },
      name: modelName,
    });
  };

  onCertificatesChange = (state: boolean) => {
    this.setState({ certificatesShow: Boolean(state) });
  };

  onPhotoRemovePress = (id: number, modelName: string, type: string) => {
    this.props.actions.removePhoto(id, modelName, type);
  };

  onChangeAbout = (value: string, modelName: string) => {
    this.props.actions.setGeneralParam(modelName, value, this.props.sectionName);
  };

  getPhotosCount = (model) =>
    model.items.filter((item) => item.status === 'uploaded').length;

  onNextPress = () => {
    const {
      certificatePhotos,
      personalPhotos,
      workPhotos,
    } = this.props;
    const customCreateMasterQuery = { avatar: '' };

    if (personalPhotos.items.length) {
      customCreateMasterQuery.avatar = personalPhotos.items[0].sizes.s;
    }

    this.props.actions.createMaster(customCreateMasterQuery).then((res) => {
      if (res.result === 'success') {
        if (this.props.isSalon) {
          trackEvent('step5Salon');
          trackEvent('step5SalonMasterPhotoCount', { labelValue: this.getPhotosCount(personalPhotos) });
          trackEvent('step5SalonCertificatePhotoCount', { labelValue: this.getPhotosCount(certificatePhotos) });
          trackEvent('step5SalonPortfolioPhotoCount', { labelValue: this.getPhotosCount(workPhotos) });
        } else {
          trackEvent('step5Private');
          trackEvent('step5PrivateMasterPhotoCount', { labelValue: this.getPhotosCount(personalPhotos) });
          trackEvent('step5PrivateCertificatePhotoCount', { labelValue: this.getPhotosCount(certificatePhotos) });
          trackEvent('step5PrivatePortfolioPhotoCount', { labelValue: this.getPhotosCount(workPhotos) });
        }

        this.props.actions.routeToSuccess();
      }
    });
  };

  onSavePress = () => {
    const { personalPhotos } = this.props;
    const customCreateMasterQuery = { avatar: '' };

    if (personalPhotos.items.length) {
      customCreateMasterQuery.avatar = personalPhotos.items[0].sizes.s;
    }

    this.props.actions.createMaster(customCreateMasterQuery).then((res) => {
      if (res.result === 'success') {
        trackEvent('changePhoto');
        this.props.actions.routeToProfile();
      }
    });
  };

  render() {
    const {
      aboutField,
      cardType,
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
        {cardType === 'create'
          ? <ButtonControl onPress={this.onNextPress} />
          : <ButtonControl
            label={localization.save}
            onPress={this.onSavePress}
          />
        }
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
