import moment from 'moment';

export const prepareEventDates = (interval, startDate) => {
  let momentStartDate = moment(startDate);
  let twoAfterTwo = 0;

  const todayDate = momentStartDate.date();
  const dayInMonth = momentStartDate.daysInMonth();
  const events = [];
  const formatDate = 'YYYY-MM-DD';

  for (let i = todayDate; i <= dayInMonth; i++) {
    const isoWeekday = momentStartDate.isoWeekday();

    switch (interval) {
    case 'onWeekdays': {
      if ([6, 7].indexOf(isoWeekday) === -1) {
        events.push(momentStartDate.format(formatDate));
      }
    } break;
    case 'onWeekends': {
      if ([6, 7].indexOf(isoWeekday) !== -1) {
        events.push(momentStartDate.format(formatDate));
      }
    } break;
    case 'wholeWeek': {
      events.push(momentStartDate.format(formatDate));
    } break;
    case 'twoAfterTwo': {
      if (twoAfterTwo < 2) {
        events.push(momentStartDate.format(formatDate));
      }
      if (twoAfterTwo === 3) {
        twoAfterTwo = -1;
      }
      twoAfterTwo++;
    } break;
    default: null;
    }

    momentStartDate = momentStartDate.add(1, 'day');
  }

  return events;
};

export default null;
