import React, { Component } from 'react';
import {
  Image,
  ListView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  Platform,
} from 'react-native';

import vars from '../../vars';
import i18n from '../../i18n';

export default class MasterCardWorks extends Component {
  state = { showGallery: false };

  constructor(props) {
    super(props);

    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

    this.state = {
      dataSource: ds.cloneWithRows(props.workPhotos),
    };
  }

  onWorkPress = index => () => {
    this.props.onWorksShow(index);
  };

  render() {
    const { workPhotos } = this.props;
    const { dataSource } = this.state;

    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.title}>
            {`${i18n.workExamples} `}
            <Text style={styles.countTitle}>{workPhotos.length} {i18n.photo.photo.toLowerCase()}</Text>
          </Text>
        </View>
        <ListView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.photos}
          contentInset={Platform.select({ ios: { left: 16, top: 0, right: 0, bottom: 0 } })}
          contentOffset={Platform.select({ ios: { x: -16, y: 0 } })}
          dataSource={dataSource}
          renderRow={(photo, sectionID, rowID) => (
            <TouchableWithoutFeedback
              onPress={this.onWorkPress(rowID)}
              activeOpacity={1}
              underlayColor
            >
              <Image source={{ uri: photo.sizes.s }} style={styles.workPhoto} />
            </TouchableWithoutFeedback>
          )}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    marginTop: 15,
    flex: 1,
    ...Platform.select({
      android: {
        marginLeft: 16,
        marginRight: 16,
        borderBottomWidth: 1,
        borderColor: vars.color.lightGrey,
      },
    }),
  },
  content: {
    alignSelf: 'stretch',
    backgroundColor: vars.color.white,
  },
  title: {
    color: vars.color.black,
    ...Platform.select({
      ios: {
        paddingLeft: 16,
        fontSize: 17,
        fontWeight: '600',
      },
      android: {
        fontSize: 20,
      },
    }),
  },
  countTitle: {
    ...Platform.select({
      ios: {
        fontWeight: '100',
      },
    }),
  },
  photos: {
    paddingTop: 8,
    paddingBottom: 16,
    flexDirection: 'row',
  },
  workPhoto: {
    marginRight: 8,
    ...Platform.select({
      ios: {
        height: 104,
        width: 104,
        borderRadius: 4,
      },
      android: {
        height: 100,
        width: 100,
      },
    }),
  },
});
