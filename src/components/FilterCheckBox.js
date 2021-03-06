/* @flow */

import React, { PureComponent } from 'react';
import { TouchableHighlight, View, Text, StyleSheet, Platform, Image } from 'react-native';

import { formatNumber } from '../utils';

import Checkbox from '../components/Checkbox';
import Input from '../components/Input';
import Separator from '../components/Separator.ios';

import vars from '../vars';
import i18n from '../i18n';

type TProps = {
  active?: boolean,
  duration?: string,
  errorFillPrice?: boolean,
  errorFillTitle?: boolean,
  index?: number,
  modelName?: string,
  onChange: (...args: any) => void,
  onChangeDuration?: (...args: any) => void,
  /* $FlowFixMe */
  onChangePrice?: (...args: any) => void,
  onChangeTitle?: (...args: any) => void,
  price?: number,
  required?: boolean,
  title?: string,
  titlePlaceholder?: string,
  titleType?: string,
  withInput?: boolean,
  shouldShowSeparator: boolean,
};

const icons = {
  ...Platform.select({
    android: {
      warning: require('../icons/android/warning.png'),
    },
  }),
};

// $FlowFixMe
export default class FilterCheckBox extends PureComponent<TProps, void> {
  onPress = () => {
    if (this.props.required) {
      return;
    }

    this.props.onChange && this.props.onChange(
      !this.props.active,
      this.props.modelName,
      this.props.index,
    );
  };

  onChangePrice = (price: string) => {
    this.props.onChangePrice && this.props.onChangePrice(
      price ? Number(price) : '',
      this.props.modelName,
      this.props.index,
    );
  };

  onChangeDuration = (duration: string) => {
    this.props.onChangeDuration && this.props.onChangeDuration(
      duration,
      this.props.modelName,
      this.props.index,
    );
  };

  onChangeTitle = (title: string) => {
    this.props.onChangeTitle && this.props.onChangeTitle(
      title,
      this.props.modelName,
      this.props.index,
    );
  };

  errorView = (wrapperStyle: any) => (
    <View style={[styles.error, wrapperStyle]}>
      <Text style={styles.errorText}>{i18n.fillField}</Text>
      <Image source={icons.warning} />
    </View>
  );

  render() {
    const {
      active,
      duration,
      errorFillPrice,
      errorFillTitle,
      price,
      required,
      title,
      titlePlaceholder,
      titleType = 'text',
      withInput = true,
      shouldShowSeparator = true,
    } = this.props;

    const requiredText = required && (
      <Text style={styles.required}> *</Text>
    );

    return (
      <View style={styles.container}>
        <TouchableHighlight
          underlayColor="transparent"
          activeOpacity={1}
          onPress={this.onPress}
          style={[styles.button, titleType === 'input' && styles.buttonWithInput]}
        >
          <View>
            <View style={styles.buttonContent}>
              {titleType === 'text' && (
                <Text style={styles.title}>{title}{requiredText}</Text>
              )}
              {titleType === 'input' && (
                <Input
                  debounce
                  debounceTimer={500}
                  inputWrapperStyle={styles.titleInput}
                  onChange={this.onChangeTitle}
                  placeholder={titlePlaceholder}
                  value={title}
                />
              )}
              <Checkbox onPress={this.onPress} checked={active} />
            </View>
            {errorFillTitle && this.errorView(styles.titleError)}
          </View>
        </TouchableHighlight>
        {active && withInput && (
          <View style={styles.fields}>
            <View style={[styles.inputWrapper, styles.rightBar]}>
              <Input
                debounce
                debounceTimer={500}
                formatValue={formatNumber}
                inputWrapperStyle={styles.input}
                keyboardType="numeric"
                onChange={this.onChangePrice}
                placeholder={i18n.filters.price}
                replaceReg={/[^0-9]/g}
                sign={` ${i18n.currency.roubleSign}`}
                value={price}
                style={styles.priceInput}
              />
              {errorFillPrice && this.errorView()}
            </View>
            <View style={styles.inputWrapper}>
              <Input
                debounce
                debounceTimer={500}
                formatValue={formatNumber}
                inputWrapperStyle={styles.input}
                keyboardType="numeric"
                onChange={this.onChangeDuration}
                placeholder={i18n.filters.duration}
                replaceReg={/[^0-9]/g}
                sign={` ${i18n.time.minuteShort}`}
                value={duration}
                style={styles.durationInput}
              />
            </View>
          </View>
        )}
        {shouldShowSeparator && Platform.OS === 'ios' && (
          <Separator />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
  button: {
    paddingLeft: 15,
    paddingRight: 15,
  },
  buttonWithInput: {
    paddingLeft: 11,
  },
  buttonContent: {
    height: 44,
    ...Platform.select({
      android: {
        height: 48,
      },
    }),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    color: vars.color.black,
    ...Platform.select({
      android: {
        fontSize: 16,
      },
      ios: {
        fontSize: 17,
      },
    }),
  },
  fields: {
    flexDirection: 'row',
    ...Platform.select({
      ios: {
        borderColor: vars.color.cellSeparatorColorIOS,
        borderTopWidth: 1,
        marginLeft: 12,
      },
    }),
  },
  titleInput: {
    flex: 1,
    ...Platform.select({
      ios: {
        borderBottomWidth: 0,
      },
    }),
  },
  inputWrapper: {
    flex: 1,
    ...Platform.select({
      ios: {
        marginTop: 8,
        marginBottom: 8,
      },
    }),
  },
  input: {
    flex: 1,
    ...Platform.select({
      ios: {
        borderBottomWidth: 0,
      },
      android: {
        paddingLeft: 11,
        paddingRight: 11,
      },
    }),
  },
  durationInput: {
    ...Platform.select({
      ios: {
        marginLeft: 5,
        paddingRight: 16,
      },
    }),
  },
  priceInput: {
    ...Platform.select({
      ios: {
        marginRight: 5,
      },
    }),
  },
  required: {
    color: vars.color.red,
  },
  rightBar: {
    ...Platform.select({
      ios: {
        borderColor: vars.color.cellSeparatorColorIOS,
        borderRightWidth: 1,
      },
    }),
  },
  error: {
    ...Platform.select({
      android: {
        marginTop: 3,
        paddingLeft: 15,
        paddingRight: 15,
      },
      ios: {
        paddingLeft: 4,
        paddingRight: 4,
        paddingBottom: 8,
      },
    }),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  errorText: {
    color: vars.color.red,
    marginRight: 10,
    ...Platform.select({
      ios: {
        fontSize: 12,
      },
    }),
  },
  titleError: {
    paddingLeft: 0,
    paddingRight: 0,
    justifyContent: 'flex-start',
  },
});
