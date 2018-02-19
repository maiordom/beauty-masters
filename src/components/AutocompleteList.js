/* @flow */

import React, { PureComponent } from 'react';
import debounce from 'lodash/debounce';
import isEmpty from 'lodash/isEmpty';
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
import { hexToRgba } from '../utils';

type TPlace = {
  label: string,
  description: string,
};

type TProps = {
  actions: {
    resetItems: () => void,
    searchItemsForText: (text: string) => void,
    selectItem: (item: { label: string }) => void,
  },
  items: Array<TPlace>,
  searchType: 'press' | 'specify',
  selected: TPlace,
  placeholder: string,
};

type TState = {
  dataSource: Object,
  selected: TPlace,
  value?: string,
};

export default class AutocompleteList extends PureComponent<TProps, TState> {
  static defaultProps = {
    items: [],
    placeholder: i18n.enterAddress,
    searchType: 'specify',
  };

  onChange = (value: string) => {
    this.setState({ value });
    this.searchItem(value);
  }

  ds: Object;

  searchItem = debounce((value) => this.props.actions.searchItemsForText(value), 300);

  constructor(props: TProps) {
    super(props);

    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

    this.state = {
      dataSource: this.ds.cloneWithRows(props.items),
      selected: props.selected,
    };
  }

  componentWillReceiveProps(nextProps: TProps) {
    const nextState = {};

    if (this.props.items !== nextProps.items) {
      nextState.dataSource = this.ds.cloneWithRows(nextProps.items);
    }

    if (this.props.selected !== nextProps.selected) {
      nextState.selected = nextProps.selected;
    }

    if (!isEmpty(nextState)) {
      this.setState(nextState);
    }
  }

  componentWillMount() {
    this.props.actions.resetItems();
  }

  onItemSelect = (item: Object) => {
    const { selected } = this.state;

    if (this.props.searchType === 'press') {
      this.props.actions.selectItem(item);
      return;
    }

    if (selected && selected.label === item.label) {
      this.props.actions.selectItem(item);
    } else {
      this.setState({ selected: item });
      this.props.actions.searchItemsForText(item.label);
    }
  };

  render() {
    const { items, placeholder } = this.props;
    const { selected, value } = this.state;

    return (
      <View style={styles.container}>
        <View style={styles.inner}>
          <Input
            debounce
            debounceTimer={1000}
            onChange={this.onChange}
            placeholder={placeholder}
            style={styles.searchField}
            value={selected && selected.label || value}
          />
          {items.length > 0 && (
            <ListView
              dataSource={this.state.dataSource}
              renderRow={(item) => (
                <TouchableWithoutFeedback
                  onPress={() => this.onItemSelect(item)}
                  key={item.label}
                >
                  <View style={styles.tab}>
                    <Text style={styles.label}>{item.label}</Text>
                    {item.description && (
                      <View>
                        <Text style={styles.description}>{item.description}</Text>
                      </View>
                    )}
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
  },
  searchField: {
    marginLeft: 16,
    marginRight: 16,
  },
  tab: {
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 16,
    paddingRight: 16,
    justifyContent: 'center',
  },
  label: {
    fontSize: 16,
    color: vars.color.black,
  },
  description: {
    fontSize: 13,
    color: hexToRgba(vars.color.black, 50),
  },
});
