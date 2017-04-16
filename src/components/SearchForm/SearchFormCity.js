import React, { Component } from 'react';
import { View, Text, StyleSheet, TouchableWithoutFeedback, ListView } from 'react-native';
import { Actions } from 'react-native-router-flux';


import vars from '../../vars';

export default class SearchFormLocation extends Component {
  constructor(props) {
    super(props);

    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

    this.state = {
      dataSource: this.ds.cloneWithRows(props.cities.items),
    };
  }

  onCityPress = (id: number) => () => {
    this.props.actions.citiesAdd(id);
    Actions.pop();
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inner}>
          <ListView
            dataSource={this.state.dataSource}
            renderRow={city => (
              <TouchableWithoutFeedback onPress={this.onCityPress(city.id)} key={city.label}>
                <View style={styles.tab}>
                  <Text style={styles.tabText}>{city.label}</Text>
                </View>
              </TouchableWithoutFeedback>
            )}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
    paddingTop: 8,
    paddingLeft: 16,
    paddingRight: 16,
  },
  tab: {
    height: 48,
    paddingLeft: 5,
    justifyContent: 'center',
  },
  tabText: {
    fontSize: 16,
    color: vars.color.black,
  },
});
