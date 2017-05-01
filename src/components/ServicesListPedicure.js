import React, { Component } from 'react';
import { View } from 'react-native';

import { FilterLabel } from './FilterLabel';
import FilterCheckBox from './FilterCheckBox';

import i18n from '../i18n';

export default class ServicesListPedicure extends Component {
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
        <FilterCheckBox {...classicPedicure} {...handlers} />
        <FilterCheckBox {...hardwarePedicure} {...handlers} />
        <FilterCheckBox {...europeanPedicure} {...handlers} />
        <FilterCheckBox {...combinedPedicure} {...handlers} />
        <FilterCheckBox {...expressPedicure} {...handlers} />
        <FilterCheckBox {...hotPedicure} {...handlers} />
        <FilterCheckBox {...spaPedicure} {...handlers} />

        <FilterLabel text={i18n.filters.coverage} />
        <FilterCheckBox {...applyingShellacPedicure} {...handlers} />
        <FilterCheckBox {...applyingBioGelPedicure} {...handlers} />
        <FilterCheckBox {...applyingNailPolishPedicure} {...handlers} />
        <FilterCheckBox {...applyingOfAnotherNailGelPedicure} {...handlers} />

        <FilterLabel text={i18n.filters.nailDesign} />
        <FilterCheckBox {...frenchPedicure} {...handlers} />
        <FilterCheckBox {...moonPedicure} {...handlers} />
        <FilterCheckBox {...reverseMoonPedicure} {...handlers} />
        <FilterCheckBox {...stencilPedicure} {...handlers} />
        <FilterCheckBox {...artDesignPedicure} {...handlers} />
        <FilterCheckBox {...gradientPedicure} {...handlers} />

        <FilterLabel text={i18n.filters.nailExtension} />
        <FilterCheckBox {...extensionTipsAcrilycPedicure} {...handlers} />
        <FilterCheckBox {...extensionFormsAcrilycPedicure} {...handlers} />
        <FilterCheckBox {...extensionTipsGelPedicure} {...handlers} />
        <FilterCheckBox {...extensionAcrilycGelPedicure} {...handlers} />

        <FilterLabel text={i18n.filters.withdrawal} />
        <FilterCheckBox {...removingNailPolishPedicure} {...handlers} />
        <FilterCheckBox {...removingShellacPedicure} {...handlers} />
        <FilterCheckBox {...removingBioGelPedicure} {...handlers} />
        <FilterCheckBox {...removingGePedicure} {...handlers} />
        <FilterCheckBox {...removingNailsPedicure} {...handlers} />
      </View>
    );
  }
}
