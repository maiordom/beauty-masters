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
            checked={item.active}
            customStyles={{container: styles.radio}}
            id={item.id}
            key={key}
            label={item.label}
            onChange={this.onRadioChange}
          />
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  radio: {
    paddingLeft: 16,
  },
});
