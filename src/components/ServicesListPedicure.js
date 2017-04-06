import React, { Component } from 'react';
import { View, } from 'react-native';

import { FilterLabel } from './FilterLabel';
import FilterCheckBox from './FilterCheckBox';

import i18n from '../i18n';

export default class ServicesListPedicure extends Component {
  onChange = (modelName, value) => {
    this.props.onChange && this.props.onChange(modelName, value);
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

    return (
      <View>
        <FilterLabel text={i18n.filters.nailProcessingMethod} />
        <FilterCheckBox {...classicPedicure} onChange={this.onChange} />
        <FilterCheckBox {...hardwarePedicure} onChange={this.onChange} />
        <FilterCheckBox {...europeanPedicure} onChange={this.onChange} />
        <FilterCheckBox {...combinedPedicure} onChange={this.onChange} />
        <FilterCheckBox {...expressPedicure} onChange={this.onChange} />
        <FilterCheckBox {...hotPedicure} onChange={this.onChange} />
        <FilterCheckBox {...spaPedicure} onChange={this.onChange} />

        <FilterLabel text={i18n.filters.coverage} onChange={this.onChange} />
        <FilterCheckBox {...applyingShellacPedicure} onChange={this.onChange} />
        <FilterCheckBox {...applyingBioGelPedicure} onChange={this.onChange} />
        <FilterCheckBox {...applyingNailPolishPedicure} onChange={this.onChange} />
        <FilterCheckBox {...applyingOfAnotherNailGelPedicure} onChange={this.onChange} />

        <FilterLabel text={i18n.filters.nailDesign} />
        <FilterCheckBox {...frenchPedicure} onChange={this.onChange} />
        <FilterCheckBox {...moonPedicure} onChange={this.onChange} />
        <FilterCheckBox {...reverseMoonPedicure} onChange={this.onChange} />
        <FilterCheckBox {...stencilPedicure} onChange={this.onChange} />
        <FilterCheckBox {...artDesignPedicure} onChange={this.onChange} />
        <FilterCheckBox {...gradientPedicure} onChange={this.onChange} />

        <FilterLabel text={i18n.filters.nailExtension} />
        <FilterCheckBox {...extensionTipsAcrilycPedicure} onChange={this.onChange} />
        <FilterCheckBox {...extensionFormsAcrilycPedicure} onChange={this.onChange} />
        <FilterCheckBox {...extensionTipsGelPedicure} onChange={this.onChange} />
        <FilterCheckBox {...extensionAcrilycGelPedicure} onChange={this.onChange} />

        <FilterLabel text={i18n.filters.withdrawal} />
        <FilterCheckBox {...removingNailPolishPedicure} onChange={this.onChange} />
        <FilterCheckBox {...removingShellacPedicure} onChange={this.onChange} />
        <FilterCheckBox {...removingBioGelPedicure} onChange={this.onChange} />
        <FilterCheckBox {...removingGePedicure} onChange={this.onChange} />
        <FilterCheckBox {...removingNailsPedicure} onChange={this.onChange} />
      </View>
    );
  }
}
