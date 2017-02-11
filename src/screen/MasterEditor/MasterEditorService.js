import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

import Tabs from '../../components/Tabs';
import { FilterLabel } from '../../components/FilterLabel';
import ButtonNext from '../../components/ButtonNext';
import Filter from '../../components/Filter';

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
        <FilterLabel text={i18n.masterEditor.services.titleOne} />
        <Filter title={i18n.filters.edging} />
        <Filter title={i18n.filters.hardware} />
        <Filter title={i18n.filters.combined} />
        <Filter title={i18n.filters.express} />
        <Filter title={i18n.filters.hot} />
        <Filter title={i18n.filters.spa} />
        <ButtonNext />
      </View>
    );
  }
}

const styles = StyleSheet.create({
 container: {
   flex: 1
 }
});
