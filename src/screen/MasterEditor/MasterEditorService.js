import React, { Component } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';

import Tabs from '../../components/Tabs';
import ButtonNext from '../../components/ButtonNext';
import ServicesList from '../../components/ServicesList';

import i18n from '../../i18n';

export default class MasterEditorService extends Component {
  constructor() {
    super();

    this.state = {
      tabs: [
        {title: i18n.manicure},
        {title: i18n.pedicure},
      ]
    };
  }

  onServicesPress = () => {

  };

  render() {
    const { tabs } = this.state;

    return (
      <View style={styles.container}>
        <ScrollView>
          <Tabs tabs={tabs} onPress={this.onServicesPress} />
          <ServicesList />
          <ButtonNext />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
 container: {
   flex: 1
 }
});
