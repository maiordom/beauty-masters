import React, { Component, PropTypes } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native';

import Input from '../../components/Input';
import Label from '../../components/Label';
import Switch from '../../components/Switch';
import { SubLabel } from '../../components/SubLabel';
import MasterPhotoList from '../../components/MasterEditor/MasterPhotoList';

import i18n from '../../i18n';

const DEVICE_WIDTH = Dimensions.get('window').width;
const PHOTO_SIZE = (DEVICE_WIDTH - 16 * 2 - 14 * 2) / 3;

export default class MasterEditorInfo extends Component {
  state = {certificatesShow: false};

  static propTypes = {
    certificatePhotos: PropTypes.object,
    passportPhotos: PropTypes.object,
    personalPhotos: PropTypes.object,
    workPhotos: PropTypes.object,
  };

  onPhotoSelectPress = props => {
    this.props.drawerOpen({contentKey: 'PhotoMaster', ...props});
  };

  onCertificatesChange = state => {
    this.setState({certificatesShow: Boolean(state)});
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
        <ScrollView style={styles.scrollView}>
          <Label
            text={i18n.masterEditor.informationAboutYou}
            subText={i18n.masterEditor.aboutDescription}
          />
          <MasterPhotoList
            photoSize={PHOTO_SIZE}
            {...personalPhotos}
            onPhotoSelectPress={() => this.onPhotoSelectPress({name: 'personalPhotos'})}
          />
          <Label text={i18n.masterEditor.fewWordsAboutYouToClients} customStyle={{paddingBottom: 0}} />
          <Input placeholder={i18n.masterEditor.aboutExample} />
          <Switch title={i18n.masterEditor.certificates} onChangeState={this.onCertificatesChange} />
          {certificatesShow && (
            <View style={styles.photosWrapper}>
              <SubLabel
                customStyle={styles.photosLabel}
                label={i18n.masterEditor.attachPhotosToConfirmCertificates}
              />
              <MasterPhotoList
                photoSize={PHOTO_SIZE}
                {...certificatePhotos}
                onPhotoSelectPress={() => this.onPhotoSelectPress({name: 'certificatePhotos'})}
              />
            </View>
          )}
          <View style={styles.photosWrapper}>
            <SubLabel
              customStyle={styles.photosLabel}
              label={i18n.masterEditor.needFirstPhotoOfYourPassport}
            />
            <MasterPhotoList
              photoSize={PHOTO_SIZE}
              {...passportPhotos}
              onPhotoSelectPress={() => this.onPhotoSelectPress({name: 'passportPhotos'})}
            />
          </View>
          <View style={styles.photosWrapper}>
            <SubLabel
              customStyle={styles.photosLabel}
              label={i18n.masterEditor.attachPhotosOfYourWork}
            />
            <MasterPhotoList
              photoSize={PHOTO_SIZE}
              {...workPhotos}
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
