import React, { Component } from 'react';
import { TouchableHighlight, View, Text, StyleSheet, Platform } from 'react-native';

import Checkbox from '../components/Checkbox';
import Input from '../components/Input';

import vars from '../vars';
import i18n from '../i18n';

export default class Filter extends Component {
  constructor() {
    super();

    this.state = {
      checked: false
    };
  }

  onPress = () => {
    const checked = this.checkboxRef.toggle();
    this.setState({checked: checked});
  };

  render() {
    const { title } = this.props;
    const { checked } = this.state;

    return (
      <View style={[styles.container, checked && styles.containerActive]}>
        <TouchableHighlight
          underlayColor='transparent'
          activeOpacity={1}
          onPress={this.onPress}
          style={styles.button}
        >
          <View style={styles.buttonContent}>
            <Text style={styles.title}>{title}</Text>
            <Checkbox ref={ref => { this.checkboxRef = ref; }} />
          </View>
        </TouchableHighlight>
        {checked && (
          <View style={styles.fields}>
            <Input placeholder={i18n.filters.price} inputWrapperStyle={styles.input} />
            <Input placeholder={i18n.filters.duration} inputWrapperStyle={styles.input} />
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  containerActive: {
    marginBottom: 24
  },
  button: {
    paddingLeft: 15,
    paddingRight: 15
  },
  buttonContent: {
    height: 44,
    ...Platform.select({
      android: {
        height: 48
      }
    }),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  title: {
    color: vars.color.black,
    ...Platform.select({
      android: {
        fontSize: 16
      }
    })
  },
  fields: {
    flexDirection: 'row'
  },
  input: {
    flex: 1,
    paddingLeft: 11,
    paddingRight: 11
  }
});
