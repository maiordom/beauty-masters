// @flow

export type TSearchFormCalendar = {
  showCalendar: boolean,
  selectedDate: string,
  onDateSelect: (date: string) => void,
  toggleCalendarModal: () => void,
};
