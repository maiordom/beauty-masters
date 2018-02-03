// @flow

import React, { PureComponent } from 'react';
import { View, Text, Platform, StyleSheet, TouchableWithoutFeedback } from 'react-native';

import FilterCheckBox from '../FilterCheckBox';

import i18n from '../../i18n';
import vars from '../../vars';

const i18nAddService = Platform.select({
  ios: i18n.filters.addService,
  android: i18n.filters.addService.toUpperCase(),
});

type TProps = {
  actions: Object,
  items: Array<Object>,
  modelName: string,
  sectionName: string,
};

export default class MasterEditorCustomServices extends PureComponent<TProps, void> {
  addCustomService = () => {
    if (this.props.items.length > 2) {
      return;
    }

    this.toogleCustomService(true);
  };

  onChange = (active: boolean) => this.toogleCustomService(active);

  toogleCustomService = (active: boolean) => {
    this.props.actions.toogleCustomService(
      this.props.modelName,
      this.props.sectionName,
      active,
    );
  };

  onChangeTitle = (title: string, modelName: string, index: number) => {
    this.props.actions.setCustomServiceParam(
      this.props.modelName,
      { title },
      index,
      this.props.sectionName,
    );
  };

  onChangePrice = (price: number, modelName: string, index: number) => {
    this.props.actions.setCustomServiceParam(
      this.props.modelName,
      { price },
      index,
      this.props.sectionName,
    );
  };

  onChangeDuration = (duration: string, modelName: string, index: number) => {
    this.props.actions.setCustomServiceParam(
      this.props.modelName,
      { duration },
      index,
      this.props.sectionName,
    );
  };

  render() {
    const { items } = this.props;
    const {
      onChange, onChangePrice, onChangeDuration, onChangeTitle,
    } = this;
    const handlers = {
      onChange,
      onChangeDuration,
      onChangePrice,
      onChangeTitle,
    };

    return (
      <View>
        {items.map((item, index) =>
          (<FilterCheckBox
            {...handlers}
            {...item}
            index={index}
            key={index}
            titlePlaceholder={i18n.customService.name}
            titleType="input"
          />))}
        <TouchableWithoutFeedback onPress={this.addCustomService}>
          <View style={styles.addService}>
            <Text style={styles.addServiceText}>{i18nAddService}</Text>
          </View>
        </TouchableWithoutFeedback>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  addService: {
    alignItems: 'center',
    height: 50,
    justifyContent: 'center',
  },
  addServiceText: {
    color: vars.color.red,
    fontSize: 14,
  },
});
