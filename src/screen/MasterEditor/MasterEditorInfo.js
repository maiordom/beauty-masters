import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { drawerOpen } from '../../actions/drawer';

import Label from '../../components/Label';
import { MasterPhotoUpload } from '../../components/MasterPhotoUpload';

import i18n from '../../i18n';

export default class MasterEditorInfo extends Component {
  onPhotoSelectPress = () => {
    drawerOpen('PhotoSelect');
  };

  render() {
    return (
      <View style={styles.container}>
        <Label text={i18n.masterEditor.informationAboutYou} subText={i18n.masterEditor.aboutDescription} />
        <MasterPhotoUpload onPress={this.onPhotoSelectPress} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 16,
    paddingRight: 16,
  }
});
