import React, { Component } from 'react';
import { View, StyleSheet, Text, Image, ListView } from 'react-native';

import vars from '../../vars';

export default class MasterCardWorks extends Component {
  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

    this.state = {
      dataSource: ds.cloneWithRows(props.workPhoto.map(uri => (
        <Image source={{ uri }} style={styles.workPhoto} />
      ))),
    };
  }

  render() {
    const { workPhoto } = this.props;
    const { dataSource } = this.state;

    if (workPhoto.length === 0) {
      return null;
    }

    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>Примеры работ {workPhoto.length} фото</Text>
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
  workPhoto: {
    height: 100,
    width: 100,
    marginRight: 8,
  },
});
