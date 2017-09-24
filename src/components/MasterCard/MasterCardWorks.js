import React, { Component } from 'react';
import {
  Image,
  ListView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import vars from '../../vars';
import i18n from '../../i18n';

export default class MasterCardWorks extends Component {
  state = { showGallery: false };

  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

    this.state = {
      dataSource: ds.cloneWithRows(props.workPhoto.map(uri => (
        <Image source={{ uri }} style={styles.workPhoto} />
      ))),
    };
  }

  onWorkPress = index => () => {
    this.props.onWorksShow(index);
  };

  render() {
    const { workPhoto } = this.props;
    const { dataSource } = this.state;

    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>{i18n.workExamples} {workPhoto.length} {i18n.photo.photo.toLowerCase()}</Text>
        </View>
        <ListView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.photos}
          dataSource={dataSource}
          renderRow={(image, sectionID, rowID) => (
            <TouchableWithoutFeedback onPress={this.onWorkPress(rowID)} activeOpacity={1} underlayColor>
              {image}
            </TouchableWithoutFeedback>
          )}
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
