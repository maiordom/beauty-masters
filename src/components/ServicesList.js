import React, { Component } from 'react';
import { View, } from 'react-native';

import { FilterLabel } from './FilterLabel';
import Filter from './Filter';

import i18n from '../i18n';

export default class ServicesList extends Component {
  render() {
    return (
      <View>
        <FilterLabel text={i18n.filters.nailProcessingMethod} />
        <Filter title={i18n.filters.edging} />
        <Filter title={i18n.filters.hardware} />
        <Filter title={i18n.filters.combined} />
        <Filter title={i18n.filters.express} />
        <Filter title={i18n.filters.hot} />
        <Filter title={i18n.filters.spa} />

        <FilterLabel text={i18n.filters.coverage} />
        <Filter title={i18n.filters.applyingShellac} />
        <Filter title={i18n.filters.applyingBioGel} />
        <Filter title={i18n.filters.applyingNailPolish} />
        <Filter title={i18n.filters.applyingOfAnotherNailGel} />

        <FilterLabel text={i18n.filters.nailDesign} />
        <Filter title={i18n.filters.french} />
        <Filter title={i18n.filters.moon} />
        <Filter title={i18n.filters.reverseMoon} />
        <Filter title={i18n.filters.stencil} />
        <Filter title={i18n.filters.artDesign} />
        <Filter title={i18n.filters.gradientManicure} />

        <FilterLabel text={i18n.filters.nailExtension} />
        <Filter title={i18n.filters.tipsy} />
        <Filter title={i18n.filters.form} />
        <Filter title={i18n.filters.gel} />
        <Filter title={i18n.filters.acrylic} />

        <FilterLabel text={i18n.filters.withdrawal} />
        <Filter title={i18n.filters.varnish} />
        <Filter title={i18n.filters.bioGel} />
        <Filter title={i18n.filters.gel} />
        <Filter title={i18n.filters.shellac} />
        <Filter title={i18n.filters.anotherNailGel} />
        <Filter title={i18n.filters.naroshchennyhNails} />
      </View>
    );
  }
}
