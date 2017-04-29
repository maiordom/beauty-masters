import React, { Component } from 'react';
import { View, Text, Platform, StyleSheet, TouchableHighlight } from 'react-native';

import FilterCheckBox from '../FilterCheckBox';

import i18n from '../../i18n';
import vars from '../../vars';

const i18nAddService = Platform.select({
  ios: i18n.filters.addService,
  android: i18n.filters.addService.toUpperCase(),
});

export default class MasterEditorCustomServices extends Component {
  addCustomService = () => {
    this.props.actions.toogleCustomService(
      this.props.modelName,
      this.props.sectionName,
      true,
    );
  };

  onChangeTitle = (title, modelName, index) => {
    this.props.actions.setCustomServiceParam(
      this.props.modelName,
      { title },
      index,
      this.props.sectionName
    );
  };

  onChangePrice = (price, modelName, index) => {
    this.props.actions.setCustomServiceParam(
      this.props.modelName,
      { price },
      index,
      this.props.sectionName,
    );
  };

  onChangeDuration = (duration, modelName, index) => {
    this.props.actions.setCustomServiceParam(
      this.props.modelName,
      { duration },
      index,
      this.props.sectionName,
    );
  };

  render() {
    const { items } = this.props;
    const { onChangePrice, onChangeDuration, onChangeTitle } = this;
    const handlers = {
      onChangeDuration,
      onChangePrice,
      onChangeTitle,
    };

    console.log(items);

    return (
      <View style={styles.container}>
        {items.map((item, index) => <FilterCheckBox
          index={index}
          key={index}
          titlePlaceholder={i18n.customService.name}
          titleType="input"
          {...handlers}
          {...item}
        />)}
        <TouchableHighlight style={styles.addService} onPress={this.addCustomService}>
          <Text style={styles.addServiceText}>{i18nAddService}</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  addService: {
    alignItems: 'center',
    height: 50,
    justifyContent: 'center',
  },
  addServiceText: {
    color: vars.color.red,
    fontSize: 14,
  }
});
