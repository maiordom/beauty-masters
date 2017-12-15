/* @flow */

import React, { Component } from 'react';
import debounce from 'lodash/debounce';
import {
  ListView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

import Input from './Input';

import vars from '../vars';
import i18n from '../i18n';

type TProps = {
  actions: {
    resetItems: () => void,
    searchItemsForText: (text: string) => void,
    selectItem: (item: { label: string }) => void,
  },
  items: Array<{ label: string }>
};

type TState = {
  dataSource: Object
};

export default class AutocompleteList extends Component<TProps, TState> {
  static defaultProps = {
    items: [],
  };

  onChange = (value: string) => this.searchItem(value);

  ds: Object;

  searchItem = debounce((value) => this.props.actions.searchItemsForText(value), 300);

  constructor(props: TProps) {
    super(props);

    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

    this.state = {
      dataSource: this.ds.cloneWithRows(props.items),
    };
  }

  componentWillReceiveProps(nextProps: TProps) {
    if (this.props.items !== nextProps.items) {
      this.setState({
        dataSource: this.ds.cloneWithRows(nextProps.items),
      });
    }
  }

  componentWillUnmount() {
    this.props.actions.resetItems();
  }

  onItemsSelect = (item: Object) => {
    this.props.actions.selectItem(item);
  };

  render() {
    const { items } = this.props;

    return (
      <View style={styles.container}>
        <View style={styles.inner}>
          <Input
            debounce
            debounceTimer={1000}
            onChange={this.onChange}
            placeholder={i18n.enterAddress}
          />
          {items.length > 0 && (
            <ListView
              dataSource={this.state.dataSource}
              renderRow={item => (
                <TouchableWithoutFeedback
                  onPress={() => this.onItemsSelect(item)}
                  key={item.label}
                >
                  <View style={styles.tab}>
                    <Text style={styles.tabText}>{item.label}</Text>
                  </View>
                </TouchableWithoutFeedback>
              )}
            />
          )}
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
