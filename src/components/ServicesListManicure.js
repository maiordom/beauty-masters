// @flow

import React, { Component } from 'react';
import { View, StyleSheet, Platform } from 'react-native';

import { FilterLabel } from './FilterLabel';
import FilterCheckBox from './FilterCheckBox';

import i18n from '../i18n';
import vars from '../vars';

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

export default class ServicesListManicure extends Component<TProps, TState> {
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
      removingGelManicure,
      removingNailsManicure,
    } = this.props.models;

    const filterHandlers = {
      onChange: this.onChange,
      onChangeDuration: this.onChangeDuration,
      onChangePrice: this.onChangePrice,
    };

    return (
      <View>
        {this.state.nailProcessingMethod && (
          <View>
            <FilterLabel text={i18n.filters.nailProcessingMethod} style={styles.sectionTitle} />
            <FilterCheckBox {...classicManicure} {...filterHandlers} />
            <FilterCheckBox {...hardwareManicure} {...filterHandlers} />
            <FilterCheckBox {...europeanManicure} {...filterHandlers} />
            <FilterCheckBox {...combinedManicure} {...filterHandlers} />
            <FilterCheckBox {...expressManicure} {...filterHandlers} />
            <FilterCheckBox {...hotManicure} {...filterHandlers} />
            <FilterCheckBox {...spaManicure} {...filterHandlers} shouldShowSeparator={false} />
          </View>
        )}

        {this.state.coverage && (
          <View>
            <FilterLabel text={i18n.filters.coverage} style={styles.sectionTitle} />
            <FilterCheckBox {...applyingNailPolishManicure} {...filterHandlers} />
            <FilterCheckBox {...applyingShellacManicure} {...filterHandlers} />
            <FilterCheckBox {...applyingBioGelManicure} {...filterHandlers} />
            <FilterCheckBox {...applyingOfAnotherNailGelManicure} {...filterHandlers} shouldShowSeparator={false} />
          </View>
        )}

        {this.state.nailDesign && (
          <View>
            <FilterLabel text={i18n.filters.nailDesign} style={styles.sectionTitle} />
            <FilterCheckBox {...frenchManicure} {...filterHandlers} />
            <FilterCheckBox {...moonManicure} {...filterHandlers} />
            <FilterCheckBox {...reverseMoonManicure} {...filterHandlers} />
            <FilterCheckBox {...stencilManicure} {...filterHandlers} />
            <FilterCheckBox {...artDesignManicure} {...filterHandlers} />
            <FilterCheckBox {...gradientManicure} {...filterHandlers} shouldShowSeparator={false} />
          </View>
        )}

        {this.state.nailExtension && (
          <View>
            <FilterLabel text={i18n.filters.nailExtension} style={styles.sectionTitle} />
            <FilterCheckBox {...extensionTipsAcrilycManicure} {...filterHandlers} />
            <FilterCheckBox {...extensionFormsAcrilycManicure} {...filterHandlers} />
            <FilterCheckBox {...extensionTipsGelManicure} {...filterHandlers} />
            <FilterCheckBox {...extensionAcrilycGelManicure} {...filterHandlers} shouldShowSeparator={false} />
          </View>
        )}

        {this.state.withdrawal && (
          <View>
            <FilterLabel text={i18n.filters.withdrawal} style={styles.sectionTitle} />
            <FilterCheckBox {...removingNailPolishManicure} {...filterHandlers} />
            <FilterCheckBox {...removingShellacManicure} {...filterHandlers} />
            <FilterCheckBox {...removingBioGelManicure} {...filterHandlers} />
            <FilterCheckBox {...removingGelManicure} {...filterHandlers} />
            <FilterCheckBox {...removingNailsManicure} {...filterHandlers} shouldShowSeparator={false} />
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  sectionTitle: {
    ...Platform.select({
      ios: {
        backgroundColor: vars.color.white,
      },
    }),
  },
});
