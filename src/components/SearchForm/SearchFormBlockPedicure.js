import React, { Component } from 'react';
import { View, TouchableOpacity, Text, Animated, Easing } from 'react-native';

import type { ServiceToggleType } from '../../types/SearchFormTypes';

import FilterSubLabel from '../../components/FilterSubLabel';
import FilterCheckBox from '../../components/FilterCheckBox';
import switchStyles, { arrowIcon } from './SearchFormSwitchStyles';

import i18n from '../../i18n';

export default class SearchFormBlockPedicure extends Component {
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

    this.setState({ showBlock: !this.state.showBlock });
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
        <View style={switchStyles.container}>
          <Text style={switchStyles.title}>{i18n.pedicure}</Text>
          <TouchableOpacity onPress={this.toggleBlock}>
            <Animated.Image
              style={[switchStyles.icon, { transform: [{ rotate: spin }] }]}
              source={arrowIcon}
            />
          </TouchableOpacity>
        </View>
        {showBlock &&
          <View>
            <FilterSubLabel title={i18n.filters.nailProcessingMethod} />
            <FilterCheckBox {...service.classicPedicure} onChange={onChange} withInput={false} />
            <FilterCheckBox {...service.hardwarePedicure} onChange={onChange} withInput={false} />
            <FilterCheckBox {...service.europeanPedicure} onChange={onChange} withInput={false} />

            <FilterSubLabel title={i18n.filters.coverage} />
            {/* {любой гель-лак}*/}
            <FilterCheckBox {...service.applyingShellacPedicure} onChange={onChange} withInput={false} />
            <FilterCheckBox {...service.applyingBioGelPedicure} onChange={onChange} withInput={false} />
            <FilterCheckBox {...service.applyingNailPolishPedicure} onChange={onChange} withInput={false} />

            <FilterSubLabel title={i18n.filters.withdrawal} />
            <FilterCheckBox {...service.removingNailPolishPedicure} onChange={onChange} withInput={false} />
            <FilterCheckBox {...service.removingBioGelPedicure} onChange={onChange} withInput={false} />
            <FilterCheckBox {...service.removingShellacPedicure} onChange={onChange} withInput={false} />
            <FilterCheckBox {...service.removingGelPedicure} onChange={onChange} withInput={false} />
            <FilterCheckBox {...service.removingNailsPedicure} onChange={onChange} withInput={false} />

            <FilterSubLabel title={i18n.filters.otherServices} />
            <FilterCheckBox
              {...service.artDesignPedicure}
              title={i18n.filters.nailDesign}
              onChange={onChange}
              withInput={false}
            />
            <FilterCheckBox {...service.extensionPedicure} onChange={onChange} withInput={false} />
          </View>}
      </View>
    );
  }
}
