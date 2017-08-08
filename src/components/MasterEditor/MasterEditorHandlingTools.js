// @flow

import React, { Component } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';

import Input from '../Input';
import Label from '../Label';
import Switch from '../Switch';
import ButtonControl from '../ButtonControl';
import { SubLabel } from '../SubLabel';

import i18n from '../../i18n';

type TProps = {
  actions: Object,
  boilingMethod: Object,
  disinfectionMethod: Object,
  dryHotMethod: Object,
  fieldDescription: string,
  fieldValue: string,
  glasperlenovySterilizerMethod: Object,
  hotSteamMethod: Object,
  onNextPress: () => void,
  sectionName: string,
  sterileOtherMethod: Object,
  ultraSoundMethod: Object,
  ultraVioletMethod: Object,
};

export default class MasterEditorHandlingTools extends Component<void, TProps, void> {
  onChange = (state: boolean, modelName: string) => {
    const { fieldValue, sectionName } = this.props;

    this.props.actions.toogleService(
      modelName,
      fieldValue,
      state,
      sectionName,
    );
  };

  onChangeOtherMethod = (value: string, modelName?: string) => {
    const { fieldDescription, sectionName } = this.props;

    this.props.actions.setServiceParam(
      modelName,
      fieldDescription,
      value,
      sectionName,
    );
  };

  render() {
    const {
      boilingMethod,
      disinfectionMethod,
      dryHotMethod,
      glasperlenovySterilizerMethod,
      hotSteamMethod,
      onNextPress,
      sterileOtherMethod,
      ultraSoundMethod,
      ultraVioletMethod,
    } = this.props;

    return (
      <View style={styles.container}>
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
        <ButtonControl onPress={onNextPress} />
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
