// @flow
import type { SelectCalendarDateType } from '../../types/SearchFormTypes';

export type TSearchFormCelendar {
  showCalendar: boolean,
  selectedDate: string,
  onDateSelect: SelectCalendarDateType,
  toggleCalendarModal: () => void,
};
