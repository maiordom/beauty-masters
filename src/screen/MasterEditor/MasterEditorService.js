import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

import Tabs from '../../components/Tabs';

import i18n from '../../i18n';

export default class MasterEditorService extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Tabs
          tabs={[
            {title: i18n.manicure},
            {title: i18n.pedicure}
          ]}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
 container: {
   flex: 1
 }
});
