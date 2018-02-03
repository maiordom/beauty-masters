// @flow

import React, { PureComponent } from 'react';
import { View, StyleSheet, Platform } from 'react-native';

import { FilterLabel } from './FilterLabel';
import FilterCheckBox from './FilterCheckBox';
import Separator from './Separator.ios';

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
  coverage?: boolean,
  nailDesign?: boolean,
  nailExtension?: boolean,
  nailProcessingMethod?: boolean,
  withdrawal?: boolean,
};

export default class ServicesListPedicure extends PureComponent<TProps, TState> {
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

  onChangePrice = (price: number, modelName: string) => {
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
      removingGelPedicure,
      removingNailsPedicure,
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
            <FilterCheckBox {...classicPedicure} {...filterHandlers} />
            <FilterCheckBox {...hardwarePedicure} {...filterHandlers} />
            <FilterCheckBox {...europeanPedicure} {...filterHandlers} />
            <FilterCheckBox {...combinedPedicure} {...filterHandlers} />
            <FilterCheckBox {...expressPedicure} {...filterHandlers} />
            <FilterCheckBox {...hotPedicure} {...filterHandlers} />
            <FilterCheckBox {...spaPedicure} {...filterHandlers} shouldShowSeparator={false} />
            {Platform.OS === 'ios' && (
              <Separator style={styles.separator} />
            )}
          </View>
        )}

        {this.state.coverage && (
          <View>
            <View style={styles.sectionPadding} />
            <FilterLabel text={i18n.filters.coverage} style={styles.sectionTitle} />
            <FilterCheckBox {...applyingShellacPedicure} {...filterHandlers} />
            <FilterCheckBox {...applyingBioGelPedicure} {...filterHandlers} />
            <FilterCheckBox {...applyingNailPolishPedicure} {...filterHandlers} />
            <FilterCheckBox {...applyingOfAnotherNailGelPedicure} {...filterHandlers} shouldShowSeparator={false} />
            {Platform.OS === 'ios' && (
              <Separator style={styles.separator} />
            )}
          </View>
        )}

        {this.state.nailDesign && (
          <View>
            <View style={styles.sectionPadding} />
            <FilterLabel text={i18n.filters.nailDesign} style={styles.sectionTitle} />
            <FilterCheckBox {...frenchPedicure} {...filterHandlers} />
            <FilterCheckBox {...moonPedicure} {...filterHandlers} />
            <FilterCheckBox {...reverseMoonPedicure} {...filterHandlers} />
            <FilterCheckBox {...stencilPedicure} {...filterHandlers} />
            <FilterCheckBox {...artDesignPedicure} {...filterHandlers} />
            <FilterCheckBox {...gradientPedicure} {...filterHandlers} shouldShowSeparator={false} />
            {Platform.OS === 'ios' && (
              <Separator style={styles.separator} />
            )}
          </View>
        )}

        {this.state.nailExtension && (
          <View>
            <View style={styles.sectionPadding} />
            <FilterLabel text={i18n.filters.nailExtension} style={styles.sectionTitle} />
            <FilterCheckBox {...extensionTipsAcrilycPedicure} {...filterHandlers} />
            <FilterCheckBox {...extensionFormsAcrilycPedicure} {...filterHandlers} />
            <FilterCheckBox {...extensionTipsGelPedicure} {...filterHandlers} />
            <FilterCheckBox {...extensionAcrilycGelPedicure} {...filterHandlers} shouldShowSeparator={false} />
            {Platform.OS === 'ios' && (
              <Separator style={styles.separator} />
            )}
          </View>
        )}

        {this.state.withdrawal && (
          <View>
            <View style={styles.sectionPadding} />
            <FilterLabel text={i18n.filters.withdrawal} style={styles.sectionTitle} />
            <FilterCheckBox {...removingNailPolishPedicure} {...filterHandlers} />
            <FilterCheckBox {...removingShellacPedicure} {...filterHandlers} />
            <FilterCheckBox {...removingBioGelPedicure} {...filterHandlers} />
            <FilterCheckBox {...removingGelPedicure} {...filterHandlers} />
            <FilterCheckBox {...removingNailsPedicure} {...filterHandlers} shouldShowSeparator={false} />
            {Platform.OS === 'ios' && (
              <Separator style={styles.separator} />
            )}
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
        borderTopWidth: 1,
        borderColor: vars.color.cellSeparatorColorIOS,
      },
    }),
  },
  sectionPadding: {
    ...Platform.select({
      ios: {
        borderTopWidth: 10,
        borderColor: vars.color.lightGrey,
      },
    }),
  },
  separator: {
    ...Platform.select({
      ios: {
        marginLeft: 0,
      },
    }),
  },
});
