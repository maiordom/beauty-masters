import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import debounce from 'lodash/debounce';
import { View, Text, StyleSheet, TouchableWithoutFeedback, ListView } from 'react-native';

import Input from '../Input';

import { searchAddress } from '../../actions/search';
import vars from '../../vars';
import i18n from '../../i18n';

const mapStateToProps = state => ({
  distances: state.searchForm.general.distances,
  addresses: state.searchForm.general.addresses
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ searchAddress }, dispatch)
});

class SearchFormLocation extends Component {
  onChange = value => this.searchAddress(value);

  searchAddress = debounce(value => this.props.actions.searchAddress(value), 300);

  constructor(props) {
    super(props);

    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

    this.state = {
      dataSource: this.ds.cloneWithRows(props.addresses.items)
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.addresses.items !== nextProps.addresses.items) {
      this.setState({
        dataSource: this.ds.cloneWithRows(nextProps.addresses.items)
      });
    }
  }

  render() {
    const {
      distances,
      addresses
    } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.inner}>
          <Input debounce={300} placeholder={i18n.enterAddress} onChange={this.onChange} />
          {addresses.items.length === 0 &&
            distances.items.map(location => (
              <TouchableWithoutFeedback onPress={() => {}} key={location.label}>
                <View style={styles.tab}>
                  <Text style={styles.tabText}>{location.label}</Text>
                </View>
              </TouchableWithoutFeedback>
            ))}
          {addresses.items.length > 0 &&
            <ListView
              dataSource={this.state.dataSource}
              renderRow={address => (
                <TouchableWithoutFeedback onPress={() => {}} key={address.label}>
                  <View style={styles.tab}>
                    <Text style={styles.tabText}>{address.label}</Text>
                  </View>
                </TouchableWithoutFeedback>
              )}
            />}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  inner: {
    flex: 1,
    paddingTop: 8,
    paddingLeft: 16,
    paddingRight: 16
  },
  tab: {
    height: 48,
    paddingLeft: 5,
    justifyContent: 'center'
  },
  tabText: {
    fontSize: 16,
    color: vars.color.black
  }
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchFormLocation);
