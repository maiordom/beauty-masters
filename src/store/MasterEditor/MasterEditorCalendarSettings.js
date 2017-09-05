/* @flow */

import i18n from '../../i18n';

import type { TCreateAddress } from '../../types/CreateAddress';
import type { TCreateTimeTable } from '../../types/CreateTimeTable';
import type { TCreateSchedule } from '../../types/CreateSchedules';

type TCalendarFieldModel = {
  label: string,
  queryParam: string,
  value: string | null,
};

type TRecipientFieldModel = {
  queryParam: string,
  value: string | null,
};

type TCustomDatesModel = {
  items: Array<any>,
  timeEndDefault: string,
  timeStartDefault: string,
};

type TIntervalGroupModel = {
  items: Array<any>,
  queryParam: string,
};

const salonTitleField = (salonTitle: string) => ({
  label: i18n.name,
  queryParam: 'name',
  value: salonTitle || null,
}: TCalendarFieldModel);

const addressField = (address: string) => ({
  label: i18n.address,
  queryParam: 'address',
  value: address || null,
}: TCalendarFieldModel);

const cityField = (city: string) => ({
  label: i18n.city,
  queryParam: 'city',
  value: city || null,
}: TCalendarFieldModel);

const subwayStationField = (district: string) => ({
  label: i18n.subwayStation,
  queryParam: 'subway_station',
  value: district || null,
}: TCalendarFieldModel);

const timeStartField = (timeStart: string) => ({
  queryParam: 'time_start',
  value: timeStart || '10:00',
}: TRecipientFieldModel);

const timeEndField = (timeEnd: string) => ({
  queryParam: 'time_end',
  value: timeEnd || '20:00',
}: TRecipientFieldModel);

const startDateField = (startDate: string) => ({
  queryParam: 'date_start',
  value: startDate || null,
}: TRecipientFieldModel);

const customDates = () => ({
  items: [],
  timeEndDefault: '20:00',
  timeStartDefault: '10:00',
}: TCustomDatesModel);

const intervalGroup = () => ({
  items: [
    { label: i18n.schedule.wholeWeek, id: 1, key: 'wholeWeek' },
    { label: i18n.schedule.twoAfterTwo, id: 4, key: 'twoAfterTwo' },
    { label: i18n.schedule.onWeekdays, id: 2, key: 'onWeekdays' },
    { label: i18n.schedule.onWeekends, id: 3, key: 'onWeekends' },
  ],
  queryParam: 'interval_type',
}: TIntervalGroupModel);

const createAddressQuery = () => ({}: TCreateAddress);
const createTimeTableQuery = () => ({}: TCreateTimeTable);
const createSchedulesQuery = () => ([]: Array<TCreateSchedule>);

export default {
  salonTitleField,
  addressField,
  cityField,
  subwayStationField,
  timeStartField,
  timeEndField,
  startDateField,
  intervalGroup,
  customDates,
  createAddressQuery,
  createTimeTableQuery,
  createSchedulesQuery,
};
