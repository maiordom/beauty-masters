import React, { Component } from 'react';
import { View } from 'react-native';

import { FilterLabel } from './FilterLabel';
import FilterCheckBox from './FilterCheckBox';

import i18n from '../i18n';

export default class ServicesListManicure extends Component {
  onChange = (active, modelName) => {
    this.props.onChange(active, modelName);
  };

  onChangePrice = (price, modelName) => {
    this.props.onChangePrice(price, modelName);
  };

  onChangeDuration = (duration, modelName) => {
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
    } = this.props;

    const {
      onChange,
      onChangePrice,
      onChangeDuration,
    } = this;

    const handlers = {
      onChange,
      onChangePrice,
      onChangeDuration,
    };

    return (
      <View>
        <FilterLabel text={i18n.filters.nailProcessingMethod} />
        <FilterCheckBox {...classicManicure} {...handlers} />
        <FilterCheckBox {...hardwareManicure} {...handlers} />
        <FilterCheckBox {...europeanManicure} {...handlers} />
        <FilterCheckBox {...combinedManicure} {...handlers} />
        <FilterCheckBox {...expressManicure} {...handlers} />
        <FilterCheckBox {...hotManicure} {...handlers} />
        <FilterCheckBox {...spaManicure} {...handlers} />

        <FilterLabel text={i18n.filters.coverage} />
        <FilterCheckBox {...applyingShellacManicure} {...handlers} />
        <FilterCheckBox {...applyingBioGelManicure} {...handlers} />
        <FilterCheckBox {...applyingNailPolishManicure} {...handlers} />
        <FilterCheckBox {...applyingOfAnotherNailGelManicure} {...handlers} />

        <FilterLabel text={i18n.filters.nailDesign} />
        <FilterCheckBox {...frenchManicure} {...handlers} />
        <FilterCheckBox {...moonManicure} {...handlers} />
        <FilterCheckBox {...reverseMoonManicure} {...handlers} />
        <FilterCheckBox {...stencilManicure} {...handlers} />
        <FilterCheckBox {...artDesignManicure} {...handlers} />
        <FilterCheckBox {...gradientManicure} {...handlers} />

        <FilterLabel text={i18n.filters.nailExtension} />
        <FilterCheckBox {...extensionTipsAcrilycManicure} {...handlers} />
        <FilterCheckBox {...extensionFormsAcrilycManicure} {...handlers} />
        <FilterCheckBox {...extensionTipsGelManicure} {...handlers} />
        <FilterCheckBox {...extensionAcrilycGelManicure} {...handlers} />

        <FilterLabel text={i18n.filters.withdrawal} />
        <FilterCheckBox {...removingNailPolishManicure} {...handlers} />
        <FilterCheckBox {...removingShellacManicure} {...handlers} />
        <FilterCheckBox {...removingBioGelManicure} {...handlers} />
        <FilterCheckBox {...removingGeManicure} {...handlers} />
        <FilterCheckBox {...removingNailsManicure} {...handlers} />
      </View>
    );
  }
}
