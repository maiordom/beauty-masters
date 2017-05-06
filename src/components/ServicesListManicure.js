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

export default class ServicesListManicure extends Component {
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
      classicManicure,
      hardwareManicure,
      europeanManicure,
      combinedManicure,
      expressManicure,
      hotManicure,
      spaManicure,
      applyingShellacManicure,
      applyingBioGelManicure,
      applyingNailPolishManicure,
      applyingOfAnotherNailGelManicure,
      frenchManicure,
      moonManicure,
      reverseMoonManicure,
      stencilManicure,
      artDesignManicure,
      gradientManicure,
      extensionTipsAcrilycManicure,
      extensionFormsAcrilycManicure,
      extensionTipsGelManicure,
      extensionAcrilycGelManicure,
      removingNailPolishManicure,
      removingShellacManicure,
      removingBioGelManicure,
      removingGeManicure,
      removingNailsManicure,
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
        <Filter model={classicManicure} />
        <Filter model={hardwareManicure} />
        <Filter model={europeanManicure} />
        <Filter model={combinedManicure} />
        <Filter model={expressManicure} />
        <Filter model={hotManicure} />
        <Filter model={spaManicure} />

        <FilterLabel text={i18n.filters.coverage} />
        <Filter model={applyingShellacManicure} />
        <Filter model={applyingBioGelManicure} />
        <Filter model={applyingNailPolishManicure} />
        <Filter model={applyingOfAnotherNailGelManicure} />

        <FilterLabel text={i18n.filters.nailDesign} />
        <Filter model={frenchManicure} />
        <Filter model={moonManicure} />
        <Filter model={reverseMoonManicure} />
        <Filter model={stencilManicure} />
        <Filter model={artDesignManicure} />
        <Filter model={gradientManicure} />

        <FilterLabel text={i18n.filters.nailExtension} />
        <Filter model={extensionTipsAcrilycManicure} />
        <Filter model={extensionFormsAcrilycManicure} />
        <Filter model={extensionTipsGelManicure} />
        <Filter model={extensionAcrilycGelManicure} />

        <FilterLabel text={i18n.filters.withdrawal} />
        <Filter model={removingNailPolishManicure} />
        <Filter model={removingShellacManicure} />
        <Filter model={removingBioGelManicure} />
        <Filter model={removingGeManicure} />
        <Filter model={removingNailsManicure} />
      </View>
    );
  }
}
