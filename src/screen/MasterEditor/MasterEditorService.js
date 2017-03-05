import React, { Component } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { Actions } from 'react-native-router-flux';

import Tabs from '../../components/Tabs';
import ButtonControl from '../../components/ButtonControl';
import ServicesList from '../../components/ServicesList';
import Label from '../../components/Label';

import i18n from '../../i18n';

export default class MasterEditorService extends Component {
  constructor() {
    super();

    this.state = {
      tabs: [
        {title: i18n.manicure},
        {title: i18n.pedicure},
      ],
    };
  }

  onServicesPress = () => {

  };

  onNextPress = () => {
    Actions.masterEditorHandlingTools();
  };

  render() {
    const { tabs } = this.state;

    return (
      <View style={styles.container}>
        <ScrollView>
          <Label text={i18n.yourServices} spacing />
          <Tabs tabs={tabs} onPress={this.onServicesPress} />
          <ServicesList />
          <ButtonControl onPress={this.onNextPress} />
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
