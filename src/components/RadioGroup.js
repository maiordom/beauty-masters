import React, { Component } from 'react';
import { View, StyleSheet } from 'react-native';

import Radio from './Radio';

import { shouldComponentUpdate } from '../utils';

export default class RadioGroup extends Component {
  shouldComponentUpdate = shouldComponentUpdate();

  onRadioChange = (value, id) => {
    this.props.onChange(value, id, this.props.modelName);
  };

  render() {
    const { items } = this.props;

    return (
      <View style={styles.container}>
        {items.map((item, key) => (
          <Radio
            key={key}
            label={item.label}
            id={item.id}
            checked={item.active}
            onChange={this.onRadioChange}
          />
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {}
});
