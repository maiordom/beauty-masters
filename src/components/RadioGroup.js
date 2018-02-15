import React, { PureComponent } from 'react';
import { View, StyleSheet } from 'react-native';

import Radio from './Radio';

export default class RadioGroup extends PureComponent {
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
            customStyles={{ container: styles.radio }}
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
