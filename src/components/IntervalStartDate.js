import React, { PureComponent } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
  Platform,
} from 'react-native';
import moment from 'moment';

import Calendar from './Calendar';
import PopupHeader from './PopupHeader.ios';

import i18n from '../i18n';
import vars from '../vars';

const CONTAINER_WIDTH = Platform.select({
  android: Dimensions.get('window').width - 16 * 2,
  ios: Dimensions.get('window').width,
});

export default class IntervalStartDate extends PureComponent {
  state = {
    selectedDate: moment().format('YYYY-MM-DD'),
  };

  onApplyPress = () => {
    this.props.actions.applyDate(this.state.selectedDate, this.props.sectionName);
    this.props.onRequestClose();
  };

  onCancel = () => {
    this.props.onRequestClose();
  };

  onDateSelect = selectedDate => {
    this.setState({ selectedDate });
  };

  render() {
    const { selectedDate } = this.state;

    return (
      <View style={styles.wrapper}>
        <TouchableWithoutFeedback onPress={this.onCancel}>
          <View style={styles.dismissButton} />
        </TouchableWithoutFeedback>
        <View style={styles.container}>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{i18n.startWorkOnThisSchedule}</Text>
          </View>
          {Platform.OS === 'ios' && (
            <PopupHeader
              title={this.props.masterRegime}
              hasAcceptButton
              hasCloseButton={false}
              onAcceptButtonPress={this.onApplyPress}
            />
          )}
          <Calendar
            selectedDate={selectedDate}
            onDateSelect={this.onDateSelect}
            containerWidth={CONTAINER_WIDTH}
          />
          {Platform.OS === 'android' && (
            <TouchableOpacity
              onPress={this.onApplyPress}
              style={styles.button}
            >
              <Text style={styles.buttonText}>OK</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    marginTop: 12,
    height: 52,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingRight: 16,
  },
  buttonText: {
    color: vars.color.red,
  },
  container: {
    backgroundColor: vars.color.white,
    ...Platform.select({
      android: {
        marginLeft: 16,
        marginRight: 16,
      },
    }),
  },
  dismissButton: {
    ...Platform.select({
      ios: {
        flex: 1,
      },
    }),
  },
  title: {
    ...Platform.select({
      android: {
        marginTop: 24,
        marginLeft: 24,
        marginRight: 24,
        marginBottom: 4,
        fontSize: 20,
        color: vars.color.black,
      },
      ios: {
        color: vars.color.grey,
        fontSize: 14,
        textAlign: 'center',
      },
    }),
  },
  titleContainer: {
    ...Platform.select({
      ios: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: vars.color.lightGrey,
        height: 48,
      },
    }),
  },
  wrapper: {
    flex: 1,
    ...Platform.select({
      android: {
        justifyContent: 'center',
      },
      ios: {
        justifyContent: 'flex-start',
      },
    }),
  },
});
