// @flow

import React, { Component } from 'react';
import {
  InteractionManager,
  ScrollView,
  Modal,
  StyleSheet,
  View,
} from 'react-native';

import isEmpty from 'lodash/isEmpty';

import { SubLabel } from '../SubLabel';
import ActivityIndicator from '../../containers/ActivityIndicator';
import ButtonControl from '../ButtonControl';
import Calendar from '../Calendar';
import Label from '../Label';
import MasterEditorAddress from '../MasterEditor/MasterEditorAddress';
import RadioGroup from '../RadioGroup';
import RangeTime from '../RangeTime';
import WorkTimeSpecification from '../../containers/WorkTimeSpecification';
import IntervalStartDate from '../../containers/IntervalStartDate';

import i18n from '../../i18n';
import { trackEvent } from '../../utils/Tracker';
import { hexToRgba } from '../../utils';
import vars from '../../vars';

type TProps = {
  actions: Object,
  calendarSettings: Object,
  cardType: string,
  sectionName: string,
};

type TState = {
  automate: string[],
  intervalStartDateVisible: boolean,
  intervalStartDateParams: {
    sectionName: string,
  },
  show: Object,
  workTimeSpecificationVisibile: boolean,
  workTimeSpecificationParams: {
    date?: string,
    hasEvent?: boolean,
    sectionName: string,
  },
};

export default class MasterEditorCalendarSettings extends Component<TProps, TState> {
  state = {
    automate: [
      'address',
      'schedule',
      'calendar',
    ],
    intervalStartDateVisible: false,
    intervalStartDateParams: {
      sectionName: this.props.sectionName,
    },
    show: {},
    workTimeSpecificationVisibile: false,
    workTimeSpecificationParams: {
      sectionName: this.props.sectionName,
    },
  };

  componentDidMount() {
    InteractionManager.runAfterInteractions(() => this.iterate());
  }

  iterate = () => {
    if (!this.state.automate.length) {
      return;
    }

    const sectionName = this.state.automate[0];

    this.setState({
      automate: this.state.automate.slice(1),
      show: Object.assign(this.state.show, { [sectionName]: true }),
    });

    setTimeout(() => this.iterate(), 20);
  };

  onAddressFieldChange = (value: string, modelName: string) => {
    this.props.actions.setAddressField(modelName, 'value', value, this.props.sectionName);
  }

  onIntervalChange = (value: string, id: number, modelName: string) => {
    this.props.actions.setCalendarInterval(modelName, id, this.props.sectionName);
    this.setState({
      intervalStartDateVisible: true,
      intervalStartDateParams: {
        sectionName: this.props.sectionName,
      },
    });
  };

  onTimeEndChange = (timeEnd: string, modelName: string) => {
    this.props.actions.setTimeTableField(modelName, 'value', timeEnd, this.props.sectionName);
    this.props.actions.setCustomDatesField('customDates', 'timeEndDefault', timeEnd, this.props.sectionName);
  };

  onTimeStartChange = (timeStart: string, modelName: string) => {
    this.props.actions.setTimeTableField(modelName, 'value', timeStart, this.props.sectionName);
    this.props.actions.setCustomDatesField('customDates', 'timeStartDefault', timeStart, this.props.sectionName);
  };

  onDateSelect = (date: string, hasEvent: boolean) => {
    this.setState({
      workTimeSpecificationVisibile: true,
      workTimeSpecificationParams: {
        date,
        hasEvent,
        sectionName: this.props.sectionName,
      },
    });
  };

  onReadyPress = () => {
    this.props.actions.next().then(() => {
      if (this.props.cardType === 'edit') {
        trackEvent('changeCalendar');
      }
    });
  };

  onAddressChange = () => {
    this.props.actions.selectAddress(this.props.sectionName);
  };

  onCityChange = () => {
    this.props.actions.selectCity(this.props.sectionName);
  }

  onSubwayStationChange = () => {
    this.props.actions.selectSubwayStation(this.props.sectionName);
  }

  toggleWorkTimeSpecificationModal = () => {
    this.setState({
      workTimeSpecificationVisibile: false,
    });
  };

  toggleIntervalStartDateModal = () => {
    this.setState({
      intervalStartDateVisible: false,
    });
  };

  render() {
    const { calendarSettings } = this.props;
    const {
      show,
      intervalStartDateVisible,
      intervalStartDateParams,
      workTimeSpecificationParams,
      workTimeSpecificationVisibile,
    } = this.state;
    const {
      intervalGroup,
      timeStartField,
      timeEndField,
      startDateField,
      customDates,
    } = calendarSettings;

    const addressModels = {
      addressField: calendarSettings.addressField,
      cityField: calendarSettings.cityField,
      salonTitleField: calendarSettings.salonTitleField,
      subwayStationField: calendarSettings.cities.selected.hasSubway ? calendarSettings.subwayStationField : undefined,
    };

    return (
      <View style={styles.container}>
        <ActivityIndicator position="absolute" />
        <ScrollView style={styles.inner}>
          <WorkTimeSpecificationModal
            props={workTimeSpecificationParams}
            visible={workTimeSpecificationVisibile}
            onRequestClose={this.toggleWorkTimeSpecificationModal}
          />
          <IntervalStartDateModal
            props={intervalStartDateParams}
            visible={intervalStartDateVisible}
            onRequestClose={this.toggleIntervalStartDateModal}
          />
          {show.address && (
            <View>
              <Label text={i18n.configureCalendar} subText={i18n.workAddress} spacing />
              <MasterEditorAddress
                models={addressModels}
                onAddressChange={this.onAddressChange}
                onCityChange={this.onCityChange}
                onSubwayStationChange={this.onSubwayStationChange}
                onChange={this.onAddressFieldChange}
              />
            </View>
          )}
          {show.schedule && (
            <View>
              <Label text={i18n.yourSchedule} subText={i18n.selectYoutSchedule} spacing />
              <RadioGroup {...intervalGroup} onChange={this.onIntervalChange} />
              <RangeTime
                onTimeStartChange={this.onTimeStartChange}
                onTimeEndChange={this.onTimeEndChange}
                timeStart={timeStartField.value}
                timeEnd={timeEndField.value}
                timeStartModelName={timeStartField.modelName}
                timeEndModelName={timeEndField.modelName}
              />
            </View>
          )}
          {show.calendar && (
            <View>
              <SubLabel label={i18n.youCanEditTheDaysApart} spacing />
              <Calendar
                disableSelectDate
                events={customDates.items}
                eventTimeEndDefault={customDates.timeEndDefault}
                eventTimeStartDefault={customDates.timeStartDefault}
                interval={intervalGroup.selected}
                onDateSelect={this.onDateSelect}
                startDate={startDateField.value}
              />
            </View>
          )}
        </ScrollView>
        <ButtonControl label={i18n.ready} onPress={this.onReadyPress} />
      </View>
    );
  }
}

const WorkTimeSpecificationModal = ({
  onRequestClose,
  props,
  visible,
}) => (
  <Modal
    animationType="fade"
    onRequestClose={onRequestClose}
    transparent
    visible={visible}
  >
    <View style={styles.modalContainer}>
      <WorkTimeSpecification
        {...props}
        onRequestClose={onRequestClose}
      />
    </View>
  </Modal>
);

const IntervalStartDateModal = ({
  onRequestClose,
  props,
  visible
}) => (
  <Modal
    animationType="fade"
    onRequestClose={onRequestClose}
    transparent
    visible={visible}
  >
    <View style={styles.modalContainer}>
      <IntervalStartDate
        {...props}
        onRequestClose={onRequestClose}
      />
    </View>
  </Modal>
);

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: hexToRgba(vars.color.black, 40),
  },
  container: {
    flex: 1,
  },
  inner: {
    flex: 1,
  },
});
