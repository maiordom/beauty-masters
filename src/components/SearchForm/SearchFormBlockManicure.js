// @flow

import React, { Component } from 'react';
import { View } from 'react-native';

import type { ServiceToggleType } from './SearchFormTypes';

import FilterSubLabel from '../../components/FilterSubLabel';
import FilterCheckBox from '../../components/FilterCheckBox';
import Switch from '../../components/Switch';
import switchStyles from './SearchFormSwitchStyles';

import i18n from '../../i18n';

export default class SearchFormBlockManicure extends Component {
  props: {
    service: Object,
    onChange: ServiceToggleType
  };

  state = { showBlock: true };

  toggleBlock = (nextState: boolean): void => {
    if (nextState !== this.state.showBlock) {
      this.setState({ showBlock: !this.state.showBlock });
    }
  };

  render() {
    const { onChange, service } = this.props;
    const { showBlock } = this.state;

    return (
      <View>
        <Switch
          title={i18n.manicure}
          customStyles={{ ...switchStyles }}
          onChange={this.toggleBlock}
          value={showBlock}
        />
        {showBlock &&
          <View>
            <FilterSubLabel title={i18n.filters.nailProcessingMethod} />
            <FilterCheckBox {...service.classicManicure} onChange={onChange} withInput={false} />
            <FilterCheckBox {...service.hardwareManicure} onChange={onChange} withInput={false} />
            <FilterCheckBox {...service.europeanManicure} onChange={onChange} withInput={false} />

            <FilterSubLabel title={i18n.filters.coverage} />
            {/* {любой гель-лак}*/}
            <FilterCheckBox {...service.applyingShellacManicure} onChange={onChange} withInput={false} />
            <FilterCheckBox {...service.applyingBioGelManicure} onChange={onChange} withInput={false} />
            <FilterCheckBox {...service.applyingNailPolishManicure} onChange={onChange} withInput={false} />

            <FilterSubLabel title={i18n.filters.withdrawal} />
            <FilterCheckBox {...service.removingNailPolishManicure} onChange={onChange} withInput={false} />
            <FilterCheckBox {...service.removingBioGelManicure} onChange={onChange} withInput={false} />
            <FilterCheckBox {...service.removingShellacManicure} onChange={onChange} withInput={false} />
            <FilterCheckBox {...service.removingGeManicure} onChange={onChange} withInput={false} />
            <FilterCheckBox {...service.removingNailsManicure} onChange={onChange} withInput={false} />

            <FilterSubLabel title={i18n.filters.otherServices} />
            <FilterCheckBox
              {...service.artDesignManicure}
              title={i18n.filters.nailDesign}
              onChange={onChange}
              withInput={false}
            />
            <FilterCheckBox {...service.extensionManicure} onChange={onChange} withInput={false} />
          </View>}
      </View>
    );
  }
}
