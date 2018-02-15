// @flow

import React, { PureComponent } from 'react';
import { View } from 'react-native';

import PickerListItem from './PickerListItem.ios';
import Separator from './Separator.ios';

type TProps = {
  items: Array<Object>,
  modelName: string,
  onChange: (value: boolean, id: number, modelName: string) => {},
};

export default class RadioGroup extends PureComponent<TProps, void> {
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
              key !== items.length - 1 && <Separator />
            }
          </View>
        ))}
      </View>
    );
  }
}
