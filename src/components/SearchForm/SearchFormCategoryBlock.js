// @flow

import React, { Component } from 'react';
import { View, TouchableOpacity, Text, Animated, Easing, Platform } from 'react-native';

import FilterSubLabel from '../../components/FilterSubLabel';
import FilterCheckBox from '../../components/FilterCheckBox';
import switchStyles, { arrowIcon } from './SearchFormSwitchStyles';

import type { TSearchFormCategorySection } from '../../types/SearchFormCategories';

type TProps = {
  onCategoryChange: (value: boolean, modelName: string) => void,
  onServiceChange: (value: boolean, modelName: string) => void,
  sections: Array<TSearchFormCategorySection>,
  title: string,
}

type TState = {
  showBlock: boolean,
  spinValue: Animated,
}

export default class SearchFormCategoryBlock extends Component<TProps, TState> {
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
    const {
      onServiceChange, onCategoryChange, sections, title,
    } = this.props;
    const { showBlock, spinValue } = this.state;

    const spin = spinValue.interpolate({
      inputRange: [0, 1],
      outputRange: ['0deg', '180deg'],
    });

    const formattedTitle = Platform.select({
      ios: title.toUpperCase(),
      android: title,
    });

    return (
      <View>
        <TouchableOpacity activeOpacity={1} onPress={this.toggleBlock}>
          <View style={switchStyles.container}>
            <Text style={switchStyles.title}>{formattedTitle}</Text>
            <Animated.Image
              style={[switchStyles.icon, { transform: [{ rotate: spin }] }]}
              source={arrowIcon}
            />
          </View>
        </TouchableOpacity>
        {showBlock &&
          <View>
            {sections.map((section) => {
              const subtitle = <FilterSubLabel title={section.title} />;
              const serviceItems = section.services.map((service) => (
                <FilterCheckBox {...service}
                  onChange={service.isCategory ? onCategoryChange : onServiceChange}
                  withInput={false}
                />
              ));
              return [subtitle].concat(serviceItems);
            })}
          </View>
        }
      </View>
    );
  }
}
