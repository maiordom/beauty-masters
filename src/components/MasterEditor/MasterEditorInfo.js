// @flow

import React, { PureComponent } from 'react';
import find from 'lodash/find';
import {
  Dimensions,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

import { SubLabel } from '../SubLabel';
import ActivityIndicator from '../../containers/ActivityIndicator';
import ButtonControl from '../ButtonControl';
import Input from '../Input';
import Label from '../Label';
import MasterPhotoList from '../MasterEditor/MasterPhotoList';
import Switch from '../Switch';
import PhotoMaster from '../../containers/PhotoMaster';

import i18n from '../../i18n';
import vars from '../../vars';
import { trackEvent } from '../../utils/Tracker';
import { hexToRgba } from '../../utils';

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
  photoMasterModalVisible: boolean,
};

export default class MasterEditorInfo extends PureComponent<TProps, TState> {
  state = {
    certificatesShow: false,
    photoMasterModalVisible: false,
  };

  componentDidMount() {
    if (this.props.cardType === 'edit' && this.props.editStatus.photos === 'required') {
      this.props.actions.getPhotos(this.props.masterCardId);
    }
  }

  onPhotoSelectPress = (modelName: string) => {
    this.setState({
      photoMasterModalParams: { name: modelName },
      photoMasterModalVisible: true,
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
    const createMasterQuery = { avatar: '' };
    const avatar = find(personalPhotos.items, { type: 'photo' });

    if (avatar) {
      createMasterQuery.avatar = avatar.sizes.s;
    }

    this.props.actions.createMaster(createMasterQuery).then((res) => {
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
    const createMasterQuery = { avatar: '' };
    const avatar = find(personalPhotos.items, { type: 'photo' });

    if (avatar) {
      createMasterQuery.avatar = avatar.sizes.s;
    }

    this.props.actions.createMaster(createMasterQuery).then((res) => {
      if (res.result === 'success') {
        trackEvent('changePhoto');
        this.props.actions.routeToProfile();
      }
    });
  };

  togglePhotoMasterVisibility = () => {
    this.setState({ photoMasterModalVisible: false });
  };

  render() {
    const {
      aboutField,
      cardType,
      certificatePhotos,
      personalPhotos,
      workPhotos,
    } = this.props;

    const {
      certificatesShow,
      photoMasterModalParams,
      photoMasterModalVisible,
    } = this.state;

    return (
      <View style={styles.container}>
        <ActivityIndicator position="absolute" />
        <PhotoMasterModal
          onRequestClose={this.togglePhotoMasterVisibility}
          props={photoMasterModalParams}
          visible={photoMasterModalVisible}
        />
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

const PhotoMasterModal = ({
  onRequestClose,
  props,
  visible
}) => (
  <Modal
    animationType="slide"
    onRequestClose={onRequestClose}
    transparent
    visible={visible}
  >
    <View style={styles.modalContainer}>
      <PhotoMaster
        {...props}
        onRequestClose={onRequestClose}
      />
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: hexToRgba(vars.color.black, 40),
  },
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
