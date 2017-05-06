// @flow

import React, { Component } from 'react';
import { View } from 'react-native';

import { FilterLabel } from './FilterLabel';
import FilterCheckBox from './FilterCheckBox';

import i18n from '../i18n';

type onChange = (active: boolean, modelName: string) => void;
type onChangeDuration = (duration: string, modelName: string) => void;
type onChangePrice = (price: number, modelName: string) => void;

type Props = {
  models: Object,
  onChange: onChange,
  onChangeDuration: onChangeDuration,
  onChangePrice: onChangePrice,
};

export default class ServicesListPedicure extends Component {
  props: Props;

  onChange = (active: boolean, modelName: string) => {
    this.props.onChange(active, modelName);
  };

  onChangePrice = (price: string, modelName: string) => {
    this.props.onChangePrice(Number(price), modelName);
  };

  onChangeDuration = (duration: string, modelName: string) => {
    this.props.onChangeDuration(duration, modelName);
  };

  render() {
    const {
      classicPedicure,
      hardwarePedicure,
      europeanPedicure,
      combinedPedicure,
      expressPedicure,
      hotPedicure,
      spaPedicure,
      applyingShellacPedicure,
      applyingBioGelPedicure,
      applyingNailPolishPedicure,
      applyingOfAnotherNailGelPedicure,
      frenchPedicure,
      moonPedicure,
      reverseMoonPedicure,
      stencilPedicure,
      artDesignPedicure,
      gradientPedicure,
      extensionTipsAcrilycPedicure,
      extensionFormsAcrilycPedicure,
      extensionTipsGelPedicure,
      extensionAcrilycGelPedicure,
      removingNailPolishPedicure,
      removingShellacPedicure,
      removingBioGelPedicure,
      removingGePedicure,
      removingNailsPedicure,
    } = this.props.models;

    const {
      onChange,
      onChangePrice,
      onChangeDuration,
    } = this;

    const Filter = ({ model }) => <FilterCheckBox
      {...model}
      onChange={onChange}
      onChangePrice={onChangePrice}
      onChangeDuration={onChangeDuration}
    />;

    return (
      <View>
        <FilterLabel text={i18n.filters.nailProcessingMethod} />
        <Filter model={classicPedicure} />
        <Filter model={hardwarePedicure} />
        <Filter model={europeanPedicure} />
        <Filter model={combinedPedicure} />
        <Filter model={expressPedicure} />
        <Filter model={hotPedicure} />
        <Filter model={spaPedicure} />

        <FilterLabel text={i18n.filters.coverage} />
        <Filter model={applyingShellacPedicure} />
        <Filter model={applyingBioGelPedicure} />
        <Filter model={applyingNailPolishPedicure} />
        <Filter model={applyingOfAnotherNailGelPedicure} />

        <FilterLabel text={i18n.filters.nailDesign} />
        <Filter model={frenchPedicure} />
        <Filter model={moonPedicure} />
        <Filter model={reverseMoonPedicure} />
        <Filter model={stencilPedicure} />
        <Filter model={artDesignPedicure} />
        <Filter model={gradientPedicure} />

        <FilterLabel text={i18n.filters.nailExtension} />
        <Filter model={extensionTipsAcrilycPedicure} />
        <Filter model={extensionFormsAcrilycPedicure} />
        <Filter model={extensionTipsGelPedicure} />
        <Filter model={extensionAcrilycGelPedicure} />

        <FilterLabel text={i18n.filters.withdrawal} />
        <Filter model={removingNailPolishPedicure} />
        <Filter model={removingShellacPedicure} />
        <Filter model={removingBioGelPedicure} />
        <Filter model={removingGePedicure} />
        <Filter model={removingNailsPedicure} />
      </View>
    );
  }
}
