/* @flow */

import React, { PureComponent, PropTypes } from 'react';
import moment from 'moment';

import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
  Platform,
} from 'react-native';

import vars from '../vars';

const DEVICE_WIDTH = Dimensions.get('window').width;
const VIEW_INDEX = 2;

type TProps = {
  activeFrom: moment,
  dayHeadings: Array<string>,
  disableSelectDate: boolean,
  eventDates: Array<string>,
  monthNames: Array<string>,
  multiSelect: boolean,
  nextButtonText: string,
  onDateSelect: (date: string | null) => void,
  onSwipeNext: () => void,
  onSwipePrev: () => void,
  onTouchNext: () => void,
  onTouchPrev: () => void,
  prevButtonText: string,
  scrollEnabled: boolean,
  selectedDate: any,
  showControls: boolean,
  showEventIndicators: boolean,
  startDate: any,
  titleFormat: string,
  today: any,
  weekStart: number,
  workDays: Array<string>,
};

export default class Calendar extends PureComponent<TProps, void> {
  constructor(props: TProps) {
    super(props);

    this.styles = {};

    if (props.width) {
      this.styles = StyleSheet.create({
        monthContainer: {
          width: props.width,
        },
        dayButton: {
          width: props.width / 7,
          alignItems: 'center',
          padding: 5,
        },
        dayButtonFiller: {
          width: props.width / 7,
          padding: 5,
        },
      });
    }
  }

  state = {
    currentMonthMoment: moment(this.props.startDate),
    selectedMoments: this.props.selectedDates.length > 0
      ? this.props.selectedDates.slice()
      : [moment(this.props.selectedDate).format()],
  };

  static defaultProps = {
    dayHeadings: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
    disableSelectDate: false,
    eventDates: [],
    monthNames: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    multiSelect: false,
    nextButtonText: 'Next',
    prevButtonText: 'Prev',
    scrollEnabled: false,
    selectedDates: [],
    showControls: false,
    showEventIndicators: false,
    startDate: moment().format('YYYY-MM-DD'),
    titleFormat: 'MMMM YYYY',
    today: moment(),
    weekStart: 1,
    width: DEVICE_WIDTH,
  };

  componentDidMount() {
    // fixes initial scrolling bug on Android
    setTimeout(() => this.scrollToItem(VIEW_INDEX), 0);
  }

  componentDidUpdate() {
    this.scrollToItem(VIEW_INDEX);
  }

  componentWillReceiveProps(props) {
    if (props.selectedDates.length > 0) {
      this.setState({ selectedMoments: props.selectedDates.slice() });
    } else if (props.selectedDate) {
      this.setState({ selectedMoments: [props.selectedDate] });
    }
  }

  getMonthStack(currentMonth) {
    if (this.props.scrollEnabled) {
      const res = [];
      for (let i = -VIEW_INDEX; i <= VIEW_INDEX; i++) {
        res.push(moment(currentMonth).add(i, 'month'));
      }
      return res;
    }
    return [moment(currentMonth)];
  }

  prepareEventDates(eventDates, events) {
    const parsedDates = {};

    // Dates without any custom properties
    eventDates.forEach((event) => {
      const date = moment(event);
      const month = moment(date).startOf('month').format();

      parsedDates[month] = parsedDates[month] || {};
      parsedDates[month][date.date() - 1] = {};
    });

    // Dates with custom properties
    if (events) {
      events.forEach((event) => {
        if (event.date) {
          const date = moment(event.date);
          const month = moment(date).startOf('month').format();

          parsedDates[month] = parsedDates[month] || {};
          parsedDates[month][date.date() - 1] = event;
        }
      });
    }

    return parsedDates;
  }

  selectDate(date) {
    if (!this.props.disableSelectDate) {
      if (this.props.multiSelect) {
        this.state.selectedMoments.push(date.format());
        this.setState({ selectedMoments: this.state.selectedMoments });
      } else {
        this.setState({ selectedMoments: [date.format()] });
      }
    }

    this.props.onDateSelect && this.props.onDateSelect(date ? date.format() : null);
  }

  onPrev = () => {
    const newMoment = moment(this.state.currentMonthMoment).subtract(1, 'month');

    this.setState({ currentMonthMoment: newMoment });
    this.props.onTouchPrev && this.props.onTouchPrev(newMoment);
  };

  onNext = () => {
    const newMoment = moment(this.state.currentMonthMoment).add(1, 'month');

    this.setState({ currentMonthMoment: newMoment });
    this.props.onTouchNext && this.props.onTouchNext(newMoment);
  };

  scrollToItem(itemIndex) {
    const scrollToX = itemIndex * this.props.width;

    if (this.props.scrollEnabled) {
      this.calendarRef.scrollTo({ y: 0, x: scrollToX, animated: false });
    }
  }

  scrollEnded(event) {
    const position = event.nativeEvent.contentOffset.x;
    const currentPage = position / this.props.width;
    const newMoment = moment(this.state.currentMonthMoment).add(currentPage - VIEW_INDEX, 'month');

    this.setState({ currentMonthMoment: newMoment });

    if (currentPage < VIEW_INDEX) {
      this.props.onSwipePrev && this.props.onSwipePrev(newMoment);
    } else if (currentPage > VIEW_INDEX) {
      this.props.onSwipeNext && this.props.onSwipeNext(newMoment);
    }
  }

  renderMonthView(argMoment, eventsMap) {
    const { activeFrom, workDays } = this.props;
    let renderIndex = 0;
    const weekRows = [];
    let days = [];
    const startOfArgMonthMoment = argMoment.startOf('month');

    const weekStart = this.props.weekStart;
    const todayMoment = moment(this.props.today);
    const todayIndex = todayMoment.date() - 1;
    const argMonthDaysCount = argMoment.daysInMonth();
    const offset = (startOfArgMonthMoment.isoWeekday() - weekStart + 7) % 7;
    const argMonthIsToday = argMoment.isSame(todayMoment, 'month');

    const events = eventsMap !== null ? eventsMap[argMoment.startOf('month').format()] : null;

    const selectedMoments = this.state.selectedMoments.reduce((object, date: string) => {
      const momentDate = moment(date);
      const isSameMonth = momentDate.isSame(argMoment, 'month');

      if (isSameMonth) {
        object[momentDate.date() - 1] = date;
      }

      return object;
    }, {});

    do {
      const dayIndex = renderIndex - offset;
      const isoWeekday = renderIndex % 7;
      let isDotted;
      let isDisable;

      if (activeFrom) {
        isDisable = moment(moment(startOfArgMonthMoment).set('date', dayIndex)).isBefore(activeFrom, 'day');
      }

      if (dayIndex >= 0 && dayIndex < argMonthDaysCount) {
        const currentDate = moment(startOfArgMonthMoment).set('date', dayIndex + 1);
        if (workDays.length) {
          isDotted = workDays.find(day => day === currentDate.format('YYYY-MM-DD'));
        }

        days.push(<Day
          dayStyles={this.styles}
          isDisable={isDisable}
          styles={this.styles}
          startOfMonth={startOfArgMonthMoment}
          isWeekend={isoWeekday === 5 || isoWeekday === 6}
          key={`${renderIndex}`}
          onPress={isDisable ? null : () => this.selectDate(currentDate)}
          caption={`${dayIndex + 1}`}
          isToday={argMonthIsToday && dayIndex === todayIndex}
          isSelected={Boolean(selectedMoments[dayIndex])}
          isDotted={isDotted}
          event={events && selectedMoments[dayIndex] ? null : events && events[dayIndex]}
          showEventIndicators={this.props.showEventIndicators}
        />);
      } else {
        days.push(<Day dayStyles={this.styles} key={`${renderIndex}`} filler />);
      }

      if (renderIndex % 7 === 6) {
        weekRows.push(<View key={weekRows.length} style={styles.weekRow}>
          {days}
        </View>);
        days = [];
        if (dayIndex + 1 >= argMonthDaysCount) {
          break;
        }
      }
      renderIndex += 1;
    } while (true);

    return (
      <View
        key={argMoment.month()}
        style={this.styles.monthContainer || styles.monthContainer}
      >
        {weekRows}
      </View>
    );
  }

  renderHeading() {
    const headings = [];

    for (let i = 0; i < 7; i++) {
      headings.push(<Text key={i} style={i === 5 || i === 6 ? styles.weekendHeading : styles.dayHeading}>
        {this.props.dayHeadings[i]}
      </Text>);
    }

    return (
      <View style={styles.calendarHeading}>
        {headings}
      </View>
    );
  }

  renderTopBar() {
    const localizedMonth = this.props.monthNames[this.state.currentMonthMoment.month()];
    const { prevButtonImage, nextButtonImage } = this.props;

    return this.props.showControls
      ? <View style={styles.calendarControls}>
        <TouchableOpacity style={styles.controlButton} onPress={this.onPrev}>
          {prevButtonImage
            ? <Image source={prevButtonImage} />
            : <Text style={styles.controlButtonText}>
              {this.props.prevButtonText}
            </Text>
          }
        </TouchableOpacity>
        <Text style={styles.title}>
          {localizedMonth} {this.state.currentMonthMoment.year()}
        </Text>
        <TouchableOpacity style={styles.controlButton} onPress={this.onNext}>
          {nextButtonImage
            ? <Image source={nextButtonImage} />
            : <Text style={styles.controlButtonText}>
              {this.props.nextButtonText}
            </Text>
          }
        </TouchableOpacity>
      </View>
      : <View style={styles.calendarControls}>
        <Text style={styles.title}>
          {this.state.currentMonthMoment.format(this.props.titleFormat)}
        </Text>
      </View>;
  }

  setCalendarRef = (ref: any) => { this.calendarRef = ref; }

  render() {
    const calendarDates = this.getMonthStack(this.state.currentMonthMoment);
    const eventDatesMap = this.prepareEventDates(this.props.eventDates, this.props.events);

    return (
      <View style={styles.calendarContainer}>
        {this.renderTopBar()}
        {this.renderHeading(this.props.titleFormat)}
        {this.props.scrollEnabled
          ? <ScrollView
            ref={this.setCalendarRef}
            horizontal
            scrollEnabled
            pagingEnabled
            removeClippedSubviews
            scrollEventThrottle={1000}
            showsHorizontalScrollIndicator={false}
            automaticallyAdjustContentInsets
            onMomentumScrollEnd={event => this.scrollEnded(event)}
          >
            {calendarDates.map(date => this.renderMonthView(moment(date), eventDatesMap))}
          </ScrollView>
          : <View ref={this.setCalendarRef}>
            {calendarDates.map(date => this.renderMonthView(moment(date), eventDatesMap))}
          </View>}
      </View>
    );
  }
}

const Day = ({
  caption,
  dayStyles,
  event,
  filler,
  isSelected,
  isToday,
  isWeekend,
  onPress,
  showEventIndicators,
  isDisable,
  isDotted,
}) => filler
  ? (
    <TouchableWithoutFeedback>
      <View style={dayStyles.dayButtonFiller || styles.dayButtonFiller}>
        <Text style={styles.day} />
      </View>
    </TouchableWithoutFeedback>
  )
  : (
    <TouchableOpacity onPress={onPress}>
      <View style={dayStyles.dayButton || styles.dayButton}>
        <View style={Day.dayCircleStyle(isWeekend, isSelected, isToday, event)}>
          <Text style={Day.dayTextStyle(isWeekend, isSelected, isToday, event, isDisable)}>{caption}</Text>
        </View>
        {showEventIndicators && (
          <View style={[
            styles.eventIndicatorFiller,
            event && styles.eventIndicator,
            event && event.eventIndicator,
          ]}
          />
        )}
        {isDotted && (
          <View style={[styles.dot, isSelected ? styles.dotSelected : null]} />
        )}
      </View>
    </TouchableOpacity>
  );

Day.dayCircleStyle = (isWeekend, isSelected, isToday, event) => {
  const dayCircleStyle = [styles.dayCircleFiller];

  if (isSelected) {
    if (isToday) {
      dayCircleStyle.push(styles.currentDayCircle);
    } else {
      dayCircleStyle.push(styles.selectedDayCircle);
    }
  }

  if (event) {
    if (isSelected) {
      dayCircleStyle.push(styles.hasEventDaySelectedCircle, event.hasEventDaySelectedCircle);
    } else {
      dayCircleStyle.push(styles.hasEventCircle, event.hasEventCircle);
    }
  }

  return dayCircleStyle;
};

Day.dayTextStyle = (isWeekend, isSelected, isToday, event, isDisable) => {
  const dayTextStyle = [styles.day];

  if (isSelected) {
    if (isToday) {
      dayTextStyle.push(styles.currentDayText);
    } else {
      dayTextStyle.push(styles.selectedDayText);
    }
  } else if (isWeekend) {
    dayTextStyle.push(styles.weekendDayText);
  }

  if (event) {
    dayTextStyle.push(styles.hasEventText, event.hasEventText);
  }

  if (isDisable) {
    dayTextStyle.push(styles.isDisable);
  }
  return dayTextStyle;
};

Day.propTypes = {
  caption: PropTypes.any,
  dayStyles: PropTypes.object,
  event: PropTypes.object,
  filler: PropTypes.bool,
  isSelected: PropTypes.bool,
  isToday: PropTypes.bool,
  isWeekend: PropTypes.bool,
  onPress: PropTypes.func,
  showEventIndicators: PropTypes.bool,
};

const styles = StyleSheet.create({
  calendarContainer: {},
  monthContainer: {
    width: DEVICE_WIDTH,
  },
  calendarControls: {
    flexDirection: 'row',
    height: 48,
    alignItems: 'center',
  },
  controlButton: {
    justifyContent: 'center',
    paddingLeft: 16,
    paddingRight: 16,
    height: 48,
  },
  controlButtonText: {
    fontSize: 15,
  },
  title: {
    flex: 1,
    textAlign: 'center',
    fontSize: 14,
  },
  calendarHeading: {
    flexDirection: 'row',
  },
  dayHeading: {
    flex: 1,
    fontSize: 12,
    textAlign: 'center',
    marginVertical: 5,
    color: vars.color.grey,
  },
  weekendHeading: {
    flex: 1,
    fontSize: 12,
    textAlign: 'center',
    marginVertical: 5,
    color: vars.color.grey,
  },
  weekRow: {
    flexDirection: 'row',
  },
  dayButton: {
    alignItems: 'center',
    padding: 5,
    width: DEVICE_WIDTH / 7,
  },
  dayButtonFiller: {
    padding: 5,
    width: DEVICE_WIDTH / 7,
  },
  day: {
    fontSize: 16,
    alignSelf: 'center',
    color: vars.color.black,
    ...Platform.select({
      ios: {
        fontSize: 15,
      },
    }),
  },
  dot: {
    position: 'absolute',
    top: 35,
    left: 28,
    width: 4,
    height: 4,
    borderRadius: 50,
    backgroundColor: vars.color.black,
  },
  dotSelected: {
    backgroundColor: vars.color.white,
  },
  eventIndicatorFiller: {
    borderColor: 'transparent',
    width: 4,
    height: 4,
    borderRadius: 2,
    top: -4,
  },
  eventIndicator: {
    backgroundColor: vars.color.black,
  },
  dayCircleFiller: {
    justifyContent: 'center',
    backgroundColor: 'transparent',
    width: 40,
    height: 40,
    borderRadius: 30,
  },
  currentDayCircle: {
    backgroundColor: vars.color.red,
  },
  currentDayText: {
    color: vars.color.white,
  },
  selectedDayCircle: {
    backgroundColor: vars.color.red,
  },
  hasEventCircle: {},
  hasEventDaySelectedCircle: {},
  hasEventText: {},
  isDisable: {
    color: vars.color.grey,
  },
  selectedDayText: {
    color: vars.color.white,
  },
  weekendDayText: {},
});
