// @flow

import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

import PickerListItem from './PickerListItem.ios';

import { shouldComponentUpdate } from '../utils';
import vars from '../vars';

type TProps = {
  items: Array<Object>,
  modelName: string,
  onChange: (value: boolean, id: number, modelName: string) => {},
};

export default class RadioGroup extends Component<TProps, void> {
  shouldComponentUpdate = shouldComponentUpdate();

  onPickerChange = (value: boolean, id: number) => {
    this.props.onChange(value, id, this.props.modelName);
  };

  render() {
    const { items } = this.props;

    return (
      <View>
        {items.map((item, key) => (
          <View key={item.id}>
            <PickerListItem
              checked={item.active}
              id={item.id}
              title={item.label}
              onChange={this.onPickerChange}
            />
            {
              key !== items.length - 1 && <View style={styles.separator} />
            }
          </View>
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  separator: {
    marginLeft: 14,
    backgroundColor: vars.color.cellSeparatorColorIOS,
    height: 1,
  },
});
