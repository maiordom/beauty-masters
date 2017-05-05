import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  ListView,
} from 'react-native';

import vars from '../../vars';

export default class CardWorks extends Component {
  props: {
  };

  constructor() {
    super();

    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

    this.state = {
      dataSource: ds.cloneWithRows([
        <Image
          source={require('../../icons/work.png')}
          style={{ height: 100, width: 100, marginRight: 8 }}
        />,
        <Image
          source={require('../../icons/work.png')}
          style={{ height: 100, width: 100, marginRight: 8 }}
        />,
        <Image
          source={require('../../icons/work.png')}
          style={{ height: 100, width: 100, marginRight: 8 }}
        />,
        <Image
          source={require('../../icons/work.png')}
          style={{ height: 100, width: 100, marginRight: 8 }}
        />,
        <Image
          source={require('../../icons/work.png')}
          style={{ height: 100, width: 100, marginRight: 8 }}
        />,
      ]),
    };
  }

  render() {
    const { dataSource } = this.state;

    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>Примеры работ  5 фото</Text>
        </View>
        <ListView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.photos}
          dataSource={dataSource}
          renderRow={image => image}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    marginLeft: 16,
    marginRight: 16,
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
  },
  photos: {
    paddingTop: 8,
    paddingBottom: 16,
    flexDirection: 'row',
  },
});
