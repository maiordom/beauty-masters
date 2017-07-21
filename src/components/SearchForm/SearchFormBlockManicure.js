// @flow

import React, { Component } from 'react';
import { View, TouchableOpacity, Text, Animated, Easing } from 'react-native';

import type { ServiceToggleType } from '../../types/SearchFormTypes';

import FilterSubLabel from '../../components/FilterSubLabel';
import FilterCheckBox from '../../components/FilterCheckBox';
import switchStyles, { arrowIcon } from './SearchFormSwitchStyles';

import i18n from '../../i18n';

export default class SearchFormBlockManicure extends Component {
  props: {
    service: Object,
    onChange: ServiceToggleType
  };

  state = {
    showBlock: true,
    spinValue: new Animated.Value(0),
  };

  toggleBlock = () => {
    Animated.timing(
      this.state.spinValue,
      {
        toValue: this.state.showBlock ? 1 : 0,
        duration: 100,
        easing: Easing.easeOut,
        useNativeDriver: true,
      },
    ).start();

    return this.setState({ showBlock: !this.state.showBlock });
  };

  render() {
    const { onChange, service } = this.props;
    const { showBlock, spinValue } = this.state;

    const spin = spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '180deg'],
    });

    return (
      <View>
        <TouchableOpacity activeOpacity={1} onPress={this.toggleBlock}>
          <View style={switchStyles.container}>
            <Text style={switchStyles.title}>{i18n.manicure}</Text>
            <Animated.Image
              style={[switchStyles.icon, { transform: [{ rotate: spin }] }]}
              source={arrowIcon}
            />
          </View>
        </TouchableOpacity>
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
          </View>
        }
      </View>
    );
  }
}
