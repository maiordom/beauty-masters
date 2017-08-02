// @flow

import React, { Component } from 'react';
import { View, InteractionManager } from 'react-native';

import { FilterLabel } from './FilterLabel';
import FilterCheckBox from './FilterCheckBox';

import i18n from '../i18n';

type onChange = (active: boolean, modelName: string) => void;
type onChangeDuration = (duration: string, modelName: string) => void;
type onChangePrice = (price: number, modelName: string) => void;

type TProps = {
  models: Object,
  onChange: onChange,
  onChangeDuration: onChangeDuration,
  onChangePrice: onChangePrice,
};

type TState = {
  automate: Array<string>,
  nailProcessingMethod?: boolean,
  coverage?: boolean,
  nailDesign?: boolean,
  nailExtension?: boolean,
  withdrawal?: boolean,
};

export default class ServicesListManicure extends Component<void, TProps, TState> {
  state = {
    automate: [
      'nailProcessingMethod',
      'coverage',
      'nailDesign',
      'nailExtension',
      'withdrawal',
    ],
  };

  componentDidMount() {
    setTimeout(() => this.iterate(), 10);
  }

  iterate = () => {
    if (!this.state.automate.length) {
      return;
    }

    const sectionName = this.state.automate[0];

    this.setState({
       automate: this.state.automate.slice(1),
       [sectionName]: true,
    });

    setTimeout(() => this.iterate(), 30);
  };

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

    const filterHandlers = {
      onChange: this.onChange,
      onChangeDuration: this.onChangeDuration,
      onChangePrice: this.onChangePrice,
    };

    return (
      <View>
        {this.state.nailProcessingMethod && (<View>
          <FilterLabel text={i18n.filters.nailProcessingMethod} />
          <FilterCheckBox {...classicManicure} {...filterHandlers} />
          <FilterCheckBox {...hardwareManicure} {...filterHandlers} />
          <FilterCheckBox {...europeanManicure} {...filterHandlers} />
          <FilterCheckBox {...combinedManicure} {...filterHandlers} />
          <FilterCheckBox {...expressManicure} {...filterHandlers} />
          <FilterCheckBox {...hotManicure} {...filterHandlers} />
          <FilterCheckBox {...spaManicure} {...filterHandlers} />
        </View>)}

        {this.state.coverage && (<View>
          <FilterLabel text={i18n.filters.coverage} />
          <FilterCheckBox {...applyingNailPolishManicure} {...filterHandlers} />
          <FilterCheckBox {...applyingShellacManicure} {...filterHandlers} />
          <FilterCheckBox {...applyingBioGelManicure} {...filterHandlers} />
          <FilterCheckBox {...applyingOfAnotherNailGelManicure} {...filterHandlers} />
        </View>)}

        {this.state.nailDesign && (<View>
          <FilterLabel text={i18n.filters.nailDesign} />
          <FilterCheckBox {...frenchManicure} {...filterHandlers} />
          <FilterCheckBox {...moonManicure} {...filterHandlers} />
          <FilterCheckBox {...reverseMoonManicure} {...filterHandlers} />
          <FilterCheckBox {...stencilManicure} {...filterHandlers} />
          <FilterCheckBox {...artDesignManicure} {...filterHandlers} />
          <FilterCheckBox {...gradientManicure} {...filterHandlers} />
        </View>)}

        {this.state.nailExtension && (<View>
          <FilterLabel text={i18n.filters.nailExtension} />
          <FilterCheckBox {...extensionTipsAcrilycManicure} {...filterHandlers} />
          <FilterCheckBox {...extensionFormsAcrilycManicure} {...filterHandlers} />
          <FilterCheckBox {...extensionTipsGelManicure} {...filterHandlers} />
          <FilterCheckBox {...extensionAcrilycGelManicure} {...filterHandlers} />
        </View>)}

        {this.state.withdrawal && (<View>
          <FilterLabel text={i18n.filters.withdrawal} />
          <FilterCheckBox {...removingNailPolishManicure} {...filterHandlers} />
          <FilterCheckBox {...removingShellacManicure} {...filterHandlers} />
          <FilterCheckBox {...removingBioGelManicure} {...filterHandlers} />
          <FilterCheckBox {...removingGeManicure} {...filterHandlers} />
          <FilterCheckBox {...removingNailsManicure} {...filterHandlers} />
        </View>)}
      </View>
    );
  }
}
