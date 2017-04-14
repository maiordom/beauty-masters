import React, { Component } from 'react';
import debounce from 'lodash/debounce';
import { View, Text, StyleSheet, TouchableWithoutFeedback, ListView } from 'react-native';

import Input from '../Input';

import vars from '../../vars';
import i18n from '../../i18n';

export default class SearchFormLocation extends Component {
  onChange = value => this.searchCity(value);

  searchCity = debounce(value => this.props.actions.searchCities(value), 300);

  constructor(props) {
    super(props);

    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

    this.state = {
      dataSource: this.ds.cloneWithRows(props.cities.items),
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.cities.items !== nextProps.cities.items) {
      this.setState({
        dataSource: this.ds.cloneWithRows(nextProps.cities.items),
      });
    }
  }

  componentWillUnmount() {
    this.props.actions.citiesReset();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inner}>
          <Input debounce={300} placeholder={i18n.enterAddress} onChange={this.onChange} />
          <ListView
            dataSource={this.state.dataSource}
            renderRow={city => (
              <TouchableWithoutFeedback onPress={() => {}} key={city.label}>
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
