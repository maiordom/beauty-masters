import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

import Input from '../Input';
import Label from '../Label';
import Switch from '../Switch';
import ButtonControl from '../ButtonControl';

import i18n from '../../i18n';

export default class MasterEditorHandlingTools extends Component {
  onChange = (state, modelName) => {
    this.props.actions.setFieldParam(
      modelName,
      this.props.fieldValue,
      state,
      this.props.sectionName,
    );
  };

  onChangeOtherMethod = (value, modelName) => {
    this.props.actions.setFieldParam(
      modelName,
      this.props.fieldValue,
      value,
      this.props.sectionName,
    );
  };

  render() {
    const {
      ultraSoundMethod,
      ultraVioletMethod,
      glasperlenovySterilizerMethod,
      dryHotMethod,
      sterileOtherMethod,
      onNextPress,
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
            value={sterileOtherMethod.value}
            placeholder={sterileOtherMethod.placeholder}
            modelName={sterileOtherMethod.modelName}
            editable={sterileOtherMethod.active}
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
