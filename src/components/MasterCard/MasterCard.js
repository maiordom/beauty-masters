// @flow

import React, { Component } from 'react';
import { View, StyleSheet, ScrollView, Image, TouchableOpacity, Text, Platform } from 'react-native';
import Gallery from 'react-native-gallery';

import MasterCardNavBar from './MasterCardNavBar';
import MasterCardHeader from './MasterCardHeader';
import MasterCardWorks from './MasterCardWorks';
import MasterCardServices from './MasterCardServices';
import MasterCardEquipment from './MasterCardEquipment';
import MasterCardSchedule from './MasterCardSchedule';

import ButtonControl from '../ButtonControl';

import i18n from '../../i18n';
import vars from '../../vars';

import type { MasterCardType } from '../../types/MasterTypes';

const icons = Platform.select({
  android: {
    back: require('../../icons/android/back-arrow.png'),
  },
  ios: {},
});

export default class MasterCard extends Component {
  props: MasterCardType;

  state = { showWorks: false, showWorksIndex: 0 };

  onWorksShow = (index: string) => this.setState({ showWorks: true, showWorksIndex: Number(index) });

  onWorksHide = () => this.setState({ showWorks: false });

  render() {
    const { workPhoto, addresses } = this.props;
    const { showWorks, showWorksIndex } = this.state;

    return (
      <View style={styles.container}>
        <ScrollView style={styles.content}>
          <View>
            <Image
              source={require('../../icons/android/photo-master.png')}
              resizeMode="cover"
              style={{ height: 260, width: null }}
            />
            <MasterCardNavBar />
          </View>
          <MasterCardHeader {...this.props} />
          <MasterCardWorks onWorksShow={this.onWorksShow} {...this.props} />
          <MasterCardServices {...this.props} />
          <MasterCardEquipment {...this.props} />
          <MasterCardSchedule addresses={addresses} />
        </ScrollView>
        <TouchableOpacity style={styles.call} activeOpacity={1}>
          <ButtonControl
            label={i18n.call}
            customStyles={{ nextButton: styles.callButton, underlayColor: vars.color.green }}
            onPress={() => {}}
          />
        </TouchableOpacity>
        {showWorks && (
          <View
            style={styles.gallery}
          >
            <Gallery initialPage={showWorksIndex} images={workPhoto} />
            <TouchableOpacity
              activeOpacity={1}
              underlayColor
              onPress={this.onWorksHide}
              style={styles.galleryNavBar}
            >
              <Image source={icons.back} />
              <Text style={styles.galleryBack}>{i18n.masterWorks}</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  content: {
    alignSelf: 'stretch',
    backgroundColor: vars.color.white,
  },
  gallery: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    flex: 1,
    backgroundColor: 'black',
  },
  galleryNavBar: {
    position: 'absolute',
    flexDirection: 'row',
    top: 0,
    left: 0,
    right: 0,
    paddingTop: 16,
    paddingLeft: 16,
    height: 60,
    backgroundColor: 'black',
  },
  galleryBack: {
    marginLeft: 32,
    fontSize: 20,
    color: vars.color.white,
  },
  call: {
    alignSelf: 'stretch',
  },
  callButton: {
    backgroundColor: vars.color.green,
  },
});
