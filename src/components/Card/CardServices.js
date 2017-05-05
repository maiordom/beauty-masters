// @flow

import React, { Component } from 'react';
import { View, StyleSheet, Text } from 'react-native';

import vars from '../../vars';

export default class CardHeader extends Component {
  props: {
  };

  state = {
  };

  render() {
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>Мои услуги</Text>
        </View>

        <View style={styles.service}><Text>Маникюр</Text></View>
        <View style={styles.service}>
          <Text style={styles.name}>Обрезной/классический маникюр</Text>
          <Text style={styles.price}>800 ₽, 30 мин</Text>
        </View>
        <View style={styles.service}>
          <Text style={styles.name}>Европейский/необрезной маникюр</Text>
          <Text style={styles.price}>950 ₽, 50 мин</Text>
        </View>
        <View style={styles.service}>
          <Text style={styles.name}>Покрытие биогелем</Text>
          <Text style={styles.price}>1 000 ₽, 35 мин</Text>
        </View>

        <View style={styles.service}><Text>Педикюр</Text></View>
        <View style={styles.service}>
          <Text style={styles.name}>Обрезной/классический педикюр</Text>
          <Text style={styles.price}>800 ₽, 30 мин</Text>
        </View>
        <View style={styles.service}>
          <Text style={styles.name}>SPA-педикюр</Text>
          <Text style={styles.price}>1 200 ₽, 60 мин</Text>
        </View>
        <View style={styles.service}>
          <Text style={styles.name}>Лунный/обратный френч</Text>
          <Text style={styles.price}>1400 ₽, 70 мин</Text>
        </View>

        <Text style={styles.showAll}>ПОСМОТРЕТЬ ВСЕ</Text>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    margin: 16,
    paddingBottom: 16,
    flex: 1,
    borderBottomWidth: 1,
    borderColor: vars.color.lightGrey,
  },
  content: {
    alignSelf: 'stretch',
    backgroundColor: vars.color.white,
  },
  title: {
    fontSize: 20,
    color: vars.color.black,
    marginBottom: 16,
  },
  service: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  name: {
    flex: 3,
  },
  price: {
    flexShrink: 0,
    color: vars.color.black,
  },
  showAll: {
    color: vars.color.red,
  },
});
