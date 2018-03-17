import React, { Component } from 'react';
import {
  Dimensions,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import find from 'lodash/find';
import toUpper from 'lodash/toUpper';

import ActivityIndicator from '../../../containers/ActivityIndicator';
import ButtonControl from '../../ButtonControl';
import Input from '../../Input';
import MasterPhotoList from '../../MasterEditor/MasterPhotoList';
import Switch from '../../Switch';
import PhotoMaster from '../../../containers/PhotoMaster';
import MasterEditorSectionTitle from '../MasterEditorSectionTitle.ios';
import Separator from '../../Separator.ios';

import type { TMasterEditorInfoProps, TMasterEditorInfoState } from './MasterEditorInfo.types';

import i18n from '../../../i18n';
import vars from '../../../vars';
import { hexToRgba } from '../../../utils';
import { trackEvent } from '../../../utils/Tracker';

import { MASTER_CARD_STATUS } from '../../../constants/Master';

type TProps = TMasterEditorInfoProps;
type TState = TMasterEditorInfoState;

const DEVICE_WIDTH = Dimensions.get('window').width;
const PAGE_SPACE = 16;
const PHOTO_SPACE = 10;
const PHOTO_INNER_SPACE = 6;
const WRAPPER_PHOTO_SIZE = (DEVICE_WIDTH - PAGE_SPACE * 2 - PHOTO_SPACE * 2) / 3;
const PHOTO_SIZE = (DEVICE_WIDTH - PAGE_SPACE * 2 - (PHOTO_SPACE + PHOTO_INNER_SPACE) * 2) / 3;

export default class MasterEditorInfo extends Component<TProps, TState> {
  state = {
    certificatesShow: false,
    photoMasterModalVisible: false,
    renderLoader: true,
  };

  componentDidMount() {
    if (this.props.cardType === 'edit' && this.props.editStatus.photos === 'required') {
      this.props.actions.getMasterInfo(this.props.masterCardId).then(() => {
        this.setState({ renderLoader: false });
      }).catch(() => {
        this.setState({ renderLoader: false });
      });
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

    if (this.props.cardType === 'edit') {
      createMasterQuery.status = MASTER_CARD_STATUS.MODERATION;
    }

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

    if (this.props.cardType === 'edit') {
      createMasterQuery.status = MASTER_CARD_STATUS.MODERATION;
    }

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
      renderLoader,
    } = this.state;

    return (
      <View style={styles.container}>
        {renderLoader && (
          <ActivityIndicator animating position="absolute" />
        )}
        <PhotoMasterModal
          onRequestClose={this.togglePhotoMasterVisibility}
          props={photoMasterModalParams}
          visible={photoMasterModalVisible}
        />
        <ScrollView style={styles.inner}>
          <View>
            <MasterEditorSectionTitle title={i18n.masterEditor.aboutDescription} />
            <View style={styles.photosWrapper}>
              <MasterPhotoList
                {...personalPhotos}
                onPhotoRemovePress={this.onPhotoRemovePress}
                onPhotoSelectPress={this.onPhotoSelectPress}
                photoSize={PHOTO_SIZE}
                wrapperPhotoSize={WRAPPER_PHOTO_SIZE}
              />
            </View>
            <View style={styles.aboutWrapper}>
              <Text style={styles.aboutTitle}>
                {toUpper(i18n.masterEditor.fewWordsAboutYouToClients)}
              </Text>
              <Separator />
              <Input
                {...aboutField}
                debounce
                numberOfLines={3}
                inputWrapperStyle={styles.aboutFieldWrapper}
                customInputStyle={styles.aboutField}
                onChange={this.onChangeAbout}
              />
            </View>
            <View style={styles.separator} />
            <Switch
              customStyles={{ container: styles.switchContainer }}
              title={i18n.masterEditor.certificates}
              onChange={this.onCertificatesChange}
            />
            {certificatesShow && (
              <View style={styles.photosWrapper}>
                <MasterEditorSectionTitle title={i18n.masterEditor.attachPhotosToConfirmCertificates} />
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
              <MasterEditorSectionTitle title={i18n.masterEditor.attachPhotosOfYourWork} />
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
            label={i18n.save}
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
  visible,
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
  aboutField: {
    height: 84,
  },
  aboutFieldWrapper: {
    borderBottomWidth: 0,
    paddingLeft: 12,
  },
  aboutTitle: {
    fontSize: 12,
    color: vars.color.grey,
    padding: 16,
  },
  aboutWrapper: {
    borderTopColor: vars.color.cellSeparatorColorIOS,
    borderBottomColor: vars.color.cellSeparatorColorIOS,
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
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
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 16,
    backgroundColor: vars.color.lightGrey,
  },
  separator: {
    backgroundColor: vars.color.lightGrey,
    height: 10,
  },
  switchContainer: {
    borderTopColor: vars.color.cellSeparatorColorIOS,
    borderBottomColor: vars.color.cellSeparatorColorIOS,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    paddingLeft: 16,
  },
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
  },
});
