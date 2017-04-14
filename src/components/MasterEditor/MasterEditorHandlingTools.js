import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

import Input from '../Input';
import Label from '../Label';
import Switch from '../Switch';
import ButtonControl from '../ButtonControl';

import i18n from '../../i18n';

export default class MasterEditorHandlingTools extends Component {
  onChange = (state, modelName) => {
    const { fieldValue, sectionName } = this.props;

    this.props.actions.toogleService(
      modelName,
      fieldValue,
      state,
      sectionName,
    );
  };

  onChangeOtherMethod = (value, modelName) => {
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
      dryHotMethod,
      glasperlenovySterilizerMethod,
      onNextPress,
      sterileOtherMethod,
      ultraSoundMethod,
      ultraVioletMethod,
    } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.inner}>
          <Label text={i18n.handlingTool} subText={i18n.specifyHowYouSterilizeTools} />
          <Switch {...ultraSoundMethod} onChange={this.onChange} />
          <Switch {...ultraVioletMethod} onChange={this.onChange} />
          <Switch {...glasperlenovySterilizerMethod} onChange={this.onChange} />
          <Switch {...dryHotMethod} onChange={this.onChange} />
          <Switch {...sterileOtherMethod} onChange={this.onChange} />
          <Input
            value={sterileOtherMethod.description}
            placeholder={sterileOtherMethod.placeholder}
            modelName={sterileOtherMethod.modelName}
            editable={sterileOtherMethod.value}
            onChange={this.onChangeOtherMethod}
          />
        </View>
        <ButtonControl onPress={onNextPress} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  inner: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15
  }
});
