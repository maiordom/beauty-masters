import React, { Component, PropTypes } from 'react';
import moment from 'moment';

import {
  Image,
  Dimensions,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native';

import vars from '../vars';

const DEVICE_WIDTH = Dimensions.get('window').width;
const VIEW_INDEX = 2;

export default class Calendar extends Component {
  state = {
    currentMonthMoment: moment(this.props.startDate),
    selectedMoment: moment(this.props.selectedDate),
  };

  static propTypes = {
    customStyle: PropTypes.object,
    dayHeadings: PropTypes.array,
    eventDates: PropTypes.array,
    monthNames: PropTypes.array,
    nextButtonText: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ]),
    onDateSelect: PropTypes.func,
    onSwipeNext: PropTypes.func,
    onSwipePrev: PropTypes.func,
    onTouchNext: PropTypes.func,
    onTouchPrev: PropTypes.func,
    prevButtonText: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.object
    ]),
    scrollEnabled: PropTypes.bool,
    selectedDate: PropTypes.any,
    showControls: PropTypes.bool,
    showEventIndicators: PropTypes.bool,
    startDate: PropTypes.any,
    titleFormat: PropTypes.string,
    today: PropTypes.any,
    weekStart: PropTypes.number,
  };

  static defaultProps = {
    customStyle: {},
    width: DEVICE_WIDTH,
    dayHeadings: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
    eventDates: [],
    monthNames: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    nextButtonText: 'Next',
    prevButtonText: 'Prev',
    scrollEnabled: false,
    showControls: false,
    showEventIndicators: false,
    startDate: moment().format('YYYY-MM-DD'),
    titleFormat: 'MMMM YYYY',
    today: moment(),
    weekStart: 1,
  };

  componentDidMount() {
    // fixes initial scrolling bug on Android
    setTimeout(() => this.scrollToItem(VIEW_INDEX), 0)
  }

  componentDidUpdate() {
    this.scrollToItem(VIEW_INDEX);
  }

  componentWillReceiveProps(props) {
    if (props.selectedDate) {
      this.setState({selectedMoment: props.selectedDate});
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
    eventDates.forEach(event => {
      const date = moment(event);
      const month = moment(date).startOf('month').format();

      parsedDates[month] = parsedDates[month] || {};
      parsedDates[month][date.date() - 1] = {};
    });

    // Dates with custom properties
    if (events) {
      events.forEach(event => {
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
    this.setState({ selectedMoment: date });
    this.props.onDateSelect && this.props.onDateSelect(date ? date.format(): null );
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
      this._calendar.scrollTo({ y: 0, x: scrollToX, animated: false });
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
    let renderIndex = 0;
    let weekRows = [];
    let days = [];
    let startOfArgMonthMoment = argMoment.startOf('month');

    const selectedMoment = moment(this.state.selectedMoment);
    const weekStart = this.props.weekStart;
    const todayMoment = moment(this.props.today);
    const todayIndex = todayMoment.date() - 1;
    const argMonthDaysCount = argMoment.daysInMonth();
    const offset = (startOfArgMonthMoment.isoWeekday() - weekStart + 7) % 7;
    const argMonthIsToday = argMoment.isSame(todayMoment, 'month');
    const selectedIndex = moment(selectedMoment).date() - 1;
    const selectedMonthIsArg = selectedMoment.isSame(argMoment, 'month');

    const events = (eventsMap !== null)
      ? eventsMap[argMoment.startOf('month').format()]
      : null;

    do {
      const dayIndex = renderIndex - offset;
      const isoWeekday = renderIndex % 7;

      if (dayIndex >= 0 && dayIndex < argMonthDaysCount) {
        days.push((
          <Day
            startOfMonth={startOfArgMonthMoment}
            isWeekend={isoWeekday === 5 || isoWeekday === 6}
            key={`${renderIndex}`}
            onPress={() => {
              this.selectDate(moment(startOfArgMonthMoment).set('date', dayIndex + 1));
            }}
            caption={`${dayIndex + 1}`}
            isToday={argMonthIsToday && (dayIndex === todayIndex)}
            isSelected={selectedMonthIsArg && (dayIndex === selectedIndex)}
            event={events && events[dayIndex]}
            showEventIndicators={this.props.showEventIndicators}
          />
        ));
      } else {
        days.push(<Day key={`${renderIndex}`} filler />);
      }
      if (renderIndex % 7 === 6) {
        weekRows.push(
          <View
            key={weekRows.length}
            style={styles.weekRow}
          >
            {days}
          </View>);
        days = [];
        if (dayIndex + 1 >= argMonthDaysCount) {
          break;
        }
      }
      renderIndex += 1;
    } while (true);

    const containerStyle = styles.monthContainer;

    return <View key={argMoment.month()} style={containerStyle}>{weekRows}</View>;
  }

  renderHeading() {
    const headings = [];

    for (let i = 0; i < 7; i++) {
      headings.push(
        <Text
          key={i}
          style={i === 5 || i === 6 ?
            styles.weekendHeading :
            styles.dayHeading}
        >
          {this.props.dayHeadings[i]}
        </Text>
      );
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
      ? (
        <View style={styles.calendarControls}>
          <TouchableOpacity
            style={styles.controlButton}
            onPress={this.onPrev}
          >
            {prevButtonImage
              ? <Image source={prevButtonImage}/>
              : <Text style={styles.controlButtonText}>
                {this.props.prevButtonText}
              </Text>
            }
          </TouchableOpacity>
          <Text style={styles.title}>
            {localizedMonth} {this.state.currentMonthMoment.year()}
          </Text>
          <TouchableOpacity
            style={styles.controlButton}
            onPress={this.onNext}
          >
            {nextButtonImage
              ? <Image source={nextButtonImage} />
              : <Text style={styles.controlButtonText}>
                {this.props.nextButtonText}
              </Text>
            }
          </TouchableOpacity>
        </View>
      )
      : (
        <View style={styles.calendarControls}>
          <Text style={styles.title}>
            {this.state.currentMonthMoment.format(this.props.titleFormat)}
          </Text>
        </View>
      );
  }

  render() {
    const calendarDates = this.getMonthStack(this.state.currentMonthMoment);
    const eventDatesMap = this.prepareEventDates(this.props.eventDates, this.props.events);

    return (
      <View style={styles.calendarContainer}>
        {this.renderTopBar()}
        {this.renderHeading(this.props.titleFormat)}
        {this.props.scrollEnabled ?
          <ScrollView
            ref={calendar => this._calendar = calendar}
            horizontal
            scrollEnabled
            pagingEnabled
            removeClippedSubviews
            scrollEventThrottle={1000}
            showsHorizontalScrollIndicator={false}
            automaticallyAdjustContentInsets
            onMomentumScrollEnd={(event) => this.scrollEnded(event)}
          >
            {calendarDates.map((date) => this.renderMonthView(moment(date), eventDatesMap))}
          </ScrollView>
          :
          <View ref={calendar => this._calendar = calendar}>
            {calendarDates.map((date) => this.renderMonthView(moment(date), eventDatesMap))}
          </View>
        }
      </View>
    );
  }
}

class Day extends Component {
  static propTypes = {
    caption: PropTypes.any,
    filler: PropTypes.bool,
    event: PropTypes.object,
    isSelected: PropTypes.bool,
    isToday: PropTypes.bool,
    isWeekend: PropTypes.bool,
    onPress: PropTypes.func,
    showEventIndicators: PropTypes.bool,
  };

  dayCircleStyle = (isWeekend, isSelected, isToday, event) => {
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

  dayTextStyle = (isWeekend, isSelected, isToday, event) => {
    const dayTextStyle = [styles.day];

    if (isToday && !isSelected) {
      dayTextStyle.push(styles.currentDayText);
    } else if (isToday || isSelected) {
      dayTextStyle.push(styles.selectedDayText);
    } else if (isWeekend) {
      dayTextStyle.push(styles.weekendDayText);
    }

    if (event) {
      dayTextStyle.push(styles.hasEventText, event.hasEventText)
    }
    return dayTextStyle;
  };

  render() {
    const {
      caption,
      filler,
      event,
      isWeekend,
      isSelected,
      isToday,
      showEventIndicators,
    } = this.props;

    return filler
      ? (
        <TouchableWithoutFeedback>
          <View style={styles.dayButtonFiller}>
            <Text style={styles.day} />
          </View>
        </TouchableWithoutFeedback>
      )
      : (
        <TouchableOpacity onPress={this.props.onPress}>
          <View style={styles.dayButton}>
            <View style={this.dayCircleStyle(isWeekend, isSelected, isToday, event)}>
              <Text style={this.dayTextStyle(isWeekend, isSelected, isToday, event)}>{caption}</Text>
            </View>
            {showEventIndicators &&
            <View style={[
              styles.eventIndicatorFiller,
              event && styles.eventIndicator,
              event && event.eventIndicator]}
            />
            }
          </View>
        </TouchableOpacity>
      );
  }
}

const styles = StyleSheet.create({
  calendarContainer: {
  },
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
  },
  eventIndicatorFiller: {
    borderColor: 'transparent',
    width: 4,
    height: 4,
    borderRadius: 2,
  },
  eventIndicator: {
    backgroundColor: '#000',
  },
  dayCircleFiller: {
    justifyContent: 'center',
    backgroundColor: 'transparent',
    width: 28,
    height: 28,
    borderRadius: 14,
  },
  currentDayCircle: {
  },
  currentDayText: {
    color: 'red',
  },
  selectedDayCircle: {
    backgroundColor: 'black',
  },
  hasEventCircle: {
  },
  hasEventDaySelectedCircle: {
  },
  hasEventText: {
  },
  selectedDayText: {
  },
  weekendDayText: {
  },
});
