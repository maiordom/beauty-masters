import React, { Component } from 'react';
import { View, } from 'react-native';

import { FilterLabel } from './FilterLabel';
import Filter from './Filter';

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
        <Filter {...classicManicure} {...handlers} />
        <Filter {...hardwareManicure} {...handlers} />
        <Filter {...europeanManicure} {...handlers} />
        <Filter {...combinedManicure} {...handlers} />
        <Filter {...expressManicure} {...handlers} />
        <Filter {...hotManicure} {...handlers} />
        <Filter {...spaManicure} {...handlers} />

        <FilterLabel text={i18n.filters.coverage}/>
        <Filter {...applyingShellacManicure} {...handlers} />
        <Filter {...applyingBioGelManicure} {...handlers} />
        <Filter {...applyingNailPolishManicure} {...handlers} />
        <Filter {...applyingOfAnotherNailGelManicure} {...handlers} />

        <FilterLabel text={i18n.filters.nailDesign} />
        <Filter {...frenchManicure} {...handlers} />
        <Filter {...moonManicure} {...handlers} />
        <Filter {...reverseMoonManicure} {...handlers} />
        <Filter {...stencilManicure} {...handlers} />
        <Filter {...artDesignManicure} {...handlers} />
        <Filter {...gradientManicure} {...handlers} />

        <FilterLabel text={i18n.filters.nailExtension} />
        <Filter {...extensionTipsAcrilycManicure} {...handlers} />
        <Filter {...extensionFormsAcrilycManicure} {...handlers} />
        <Filter {...extensionTipsGelManicure} {...handlers} />
        <Filter {...extensionAcrilycGelManicure} {...handlers} />

        <FilterLabel text={i18n.filters.withdrawal} />
        <Filter {...removingNailPolishManicure} {...handlers} />
        <Filter {...removingShellacManicure} {...handlers} />
        <Filter {...removingBioGelManicure} {...handlers} />
        <Filter {...removingGeManicure} {...handlers} />
        <Filter {...removingNailsManicure} {...handlers} />
      </View>
    );
  }
}
