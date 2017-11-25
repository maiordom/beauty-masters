// @flow

import React, { Component } from 'react';
import { View, TouchableOpacity, Text, Animated, Easing, Platform } from 'react-native';

import FilterSubLabel from '../../components/FilterSubLabel';
import FilterCheckBox from '../../components/FilterCheckBox';
import switchStyles, { arrowIcon } from './SearchFormSwitchStyles';

import i18n from '../../i18n';

type TProps = {
  onCategoryChange: (value: boolean, modelName: string) => void,
  onServiceChange: (value: boolean, modelName: string) => void,
  service: Object,
}

type TState = {
  showBlock: boolean,
  spinValue: Animated,
}

export default class SearchFormBlockManicure extends Component<TProps, TState> {
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
    const { onServiceChange, onCategoryChange, service } = this.props;
    const { showBlock, spinValue } = this.state;

    const spin = spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '180deg'],
    });

    const title = Platform.select({
      ios: i18n.manicure.toUpperCase(),
      android: i18n.manicure,
    });

    return (
      <View>
        <TouchableOpacity activeOpacity={1} onPress={this.toggleBlock}>
          <View style={switchStyles.container}>
            <Text style={switchStyles.title}>{title}</Text>
            <Animated.Image
              style={[switchStyles.icon, { transform: [{ rotate: spin }] }]}
              source={arrowIcon}
            />
          </View>
        </TouchableOpacity>
        {showBlock &&
          <View>
            <FilterSubLabel title={i18n.filters.nailProcessingMethod} />
            <FilterCheckBox {...service.classicManicure} onChange={onServiceChange} withInput={false} />
            <FilterCheckBox {...service.hardwareManicure} onChange={onServiceChange} withInput={false} />
            <FilterCheckBox {...service.europeanManicure} onChange={onServiceChange} withInput={false} />

            <FilterSubLabel title={i18n.filters.coverage} />
            <FilterCheckBox {...service.applyingShellacManicure} onChange={onServiceChange} withInput={false} />
            <FilterCheckBox {...service.applyingBioGelManicure} onChange={onServiceChange} withInput={false} />
            <FilterCheckBox {...service.applyingNailPolishManicure} onChange={onServiceChange} withInput={false} />

            <FilterSubLabel title={i18n.filters.withdrawal} />
            <FilterCheckBox {...service.removingNailPolishManicure} onChange={onServiceChange} withInput={false} />
            <FilterCheckBox {...service.removingBioGelManicure} onChange={onServiceChange} withInput={false} />
            <FilterCheckBox {...service.removingShellacManicure} onChange={onServiceChange} withInput={false} />
            <FilterCheckBox {...service.removingGelManicure} onChange={onServiceChange} withInput={false} />
            <FilterCheckBox {...service.removingNailsManicure} onChange={onServiceChange} withInput={false} />

            <FilterSubLabel title={i18n.filters.otherServices} />
            <FilterCheckBox
              {...service.designManicure}
              onChange={onCategoryChange}
              withInput={false}
            />
            <FilterCheckBox
              {...service.extensionManicure}
              onChange={onCategoryChange}
              withInput={false}
              shouldShowSeparator={false}
            />
          </View>
        }
      </View>
    );
  }
}
