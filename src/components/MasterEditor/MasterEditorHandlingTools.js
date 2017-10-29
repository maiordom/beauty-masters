// @flow

import React, { Component } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';

import { SubLabel } from '../SubLabel';
import ActivityIndicator from '../../containers/ActivityIndicator';
import ButtonControl from '../ButtonControl';
import Input from '../Input';
import Label from '../Label';
import Switch from '../Switch';
import EditControl from '../EditControl';

import i18n from '../../i18n';

type TProps = {
  actions: Object,
  cardType: string,
  modelParamName: string,
  models: Object,
  queryParamName: string,
  sectionName: string,
};

export default class MasterEditorHandlingTools extends Component<TProps, void> {
  onChange = (state: boolean, modelName: string) => {
    const { modelParamName, sectionName } = this.props;

    this.props.actions.toggleService(
      modelName,
      modelParamName,
      state,
      sectionName,
    );
  };

  onChangeOtherMethod = (value: string, modelName?: string) => {
    const { queryParamName, sectionName } = this.props;

    this.props.actions.setServiceParam(
      modelName,
      queryParamName,
      value,
      sectionName,
    );
  };

  onNextPress = () => {
    this.props.actions.createMasterServices().then((res) => {
      if (res.result === 'success') {
        this.props.actions.routeToCalendars();
      }
    });
  };

  onSavePress = () => {
    this.props.actions.createMasterServices().then((res) => {
      if (res.result === 'success') {
        this.props.actions.routeToProfile();
      }
    });
  };

  render() {
    const { cardType } = this.props;
    const {
      boilingMethod,
      disinfectionMethod,
      dryHotMethod,
      glasperlenovySterilizerMethod,
      hotSteamMethod,
      sterileOtherMethod,
      ultraSoundMethod,
      ultraVioletMethod,
    } = this.props.models;

    return (
      <View style={styles.container}>
        <ActivityIndicator position="absolute" />
        <ScrollView style={styles.inner}>
          <Label text={i18n.handlingTool} subText={i18n.specifyHowYouSterilizeTools} />
          <View>
            <SubLabel customStyles={styles.subLabel} label={i18n.disinfection} />
            <Switch {...ultraSoundMethod} onChange={this.onChange} />
            <Switch {...ultraVioletMethod} onChange={this.onChange} />
            <Switch {...disinfectionMethod} onChange={this.onChange} />
          </View>
          <View>
            <SubLabel customStyles={styles.subLabel} label={i18n.handlingToolMethods.sterilization} />
            <Switch {...glasperlenovySterilizerMethod} onChange={this.onChange} />
            <Switch {...hotSteamMethod} onChange={this.onChange} />
            <Switch {...dryHotMethod} onChange={this.onChange} />
            <Switch {...boilingMethod} onChange={this.onChange} />
            <Switch {...sterileOtherMethod} onChange={this.onChange} />
            <Input
              value={sterileOtherMethod.description}
              placeholder={sterileOtherMethod.placeholder}
              modelName={sterileOtherMethod.modelName}
              editable={sterileOtherMethod.value}
              onChange={this.onChangeOtherMethod}
            />
          </View>
        </ScrollView>
        {cardType === 'create'
          ? <ButtonControl onPress={this.onNextPress} />
          : <EditControl
            onNextPress={this.onNextPress}
            onSavePress={this.onSavePress}
          />
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
  },
  subLabel: {
    height: 48,
  },
});
