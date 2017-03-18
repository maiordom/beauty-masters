import React, { Component } from 'react';
import { View, } from 'react-native';

import { FilterLabel } from './FilterLabel';
import Filter from './Filter';

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
        <Filter {...classicPedicure} onChange={this.onChange} />
        <Filter {...hardwarePedicure} onChange={this.onChange} />
        <Filter {...europeanPedicure} onChange={this.onChange} />
        <Filter {...combinedPedicure} onChange={this.onChange} />
        <Filter {...expressPedicure} onChange={this.onChange} />
        <Filter {...hotPedicure} onChange={this.onChange} />
        <Filter {...spaPedicure} onChange={this.onChange} />

        <FilterLabel text={i18n.filters.coverage} onChange={this.onChange} />
        <Filter {...applyingShellacPedicure} onChange={this.onChange} />
        <Filter {...applyingBioGelPedicure} onChange={this.onChange} />
        <Filter {...applyingNailPolishPedicure} onChange={this.onChange} />
        <Filter {...applyingOfAnotherNailGelPedicure} onChange={this.onChange} />

        <FilterLabel text={i18n.filters.nailDesign} />
        <Filter {...frenchPedicure} onChange={this.onChange} />
        <Filter {...moonPedicure} onChange={this.onChange} />
        <Filter {...reverseMoonPedicure} onChange={this.onChange} />
        <Filter {...stencilPedicure} onChange={this.onChange} />
        <Filter {...artDesignPedicure} onChange={this.onChange} />
        <Filter {...gradientPedicure} onChange={this.onChange} />

        <FilterLabel text={i18n.filters.nailExtension} />
        <Filter {...extensionTipsAcrilycPedicure} onChange={this.onChange} />
        <Filter {...extensionFormsAcrilycPedicure} onChange={this.onChange} />
        <Filter {...extensionTipsGelPedicure} onChange={this.onChange} />
        <Filter {...extensionAcrilycGelPedicure} onChange={this.onChange} />

        <FilterLabel text={i18n.filters.withdrawal} />
        <Filter {...removingNailPolishPedicure} onChange={this.onChange} />
        <Filter {...removingShellacPedicure} onChange={this.onChange} />
        <Filter {...removingBioGelPedicure} onChange={this.onChange} />
        <Filter {...removingGePedicure} onChange={this.onChange} />
        <Filter {...removingNailsPedicure} onChange={this.onChange} />
      </View>
    );
  }
}
