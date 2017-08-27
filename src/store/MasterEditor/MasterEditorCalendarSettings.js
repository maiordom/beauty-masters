/* @flow */

import i18n from '../../i18n';

type CalendarFieldModel = {
  label: string,
  queryParam: string,
  queryType: string,
  value: string | null,
};

type RecipientFieldModel = {
  queryParam: string,
  queryType: string,
  value: string | null,
};

type CustomDatesModel = {
  fromQueryParamMapping: {
    date: string,
    active: string,
    end_time: string,
    start_time: string,
  },
  items: Array<any>,
  queryAction: string,
  queryParam: string,
  queryParamMapping: {
    date: string,
    status: string,
    timeEnd: string,
    timeStart: string,
  },
  timeEndDefault: string,
  timeStartDefault: string,
};

type IntervalGroupModel = {
  items: Array<any>,
  queryAction: string,
  queryParam: string,
  queryType: string,
};

const salonTitleField = (salonTitle: string) => ({
  label: i18n.name,
  queryParam: 'salon_title',
  queryType: 'value',
  value: salonTitle || null,
}: CalendarFieldModel);

const addressField = (address: string) => ({
  label: i18n.address,
  queryParam: 'address',
  queryType: 'value',
  value: address || null,
}: CalendarFieldModel);

const cityField = (city: string) => ({
  label: i18n.city,
  queryParam: 'city',
  queryType: 'value',
  value: city || null,
}: CalendarFieldModel);

const subwayStationField = (district: string) => ({
  label: i18n.subwayStation,
  queryParam: 'subway_station',
  queryType: 'value',
  value: district || null,
}: CalendarFieldModel);

const timeStartField = (timeStart: string) => ({
  queryParam: 'time_start',
  queryType: 'value',
  value: timeStart || '10:00',
}: RecipientFieldModel);

const timeEndField = (timeEnd: string) => ({
  queryParam: 'time_end',
  queryType: 'value',
  value: timeEnd || '20:00',
}: RecipientFieldModel);

const startDateField = (startDate: string) => ({
  queryParam: 'start_date',
  queryType: 'value',
  value: startDate || null,
}: RecipientFieldModel);

const customDates = () => ({
  fromQueryParamMapping: {
    date: 'date',
    active: 'status',
    end_time: 'timeEnd',
    start_time: 'timeStart',
  },
  items: [],
  queryAction: 'fill',
  queryParam: 'custom_recipients',
  queryParamMapping: {
    date: 'date',
    status: 'active',
    timeEnd: 'end_time',
    timeStart: 'start_time',
  },
  queryType: 'items',
  timeEndDefault: '20:00',
  timeStartDefault: '10:00',
}: CustomDatesModel);

const intervalGroup = () => ({
  items: [
    { label: i18n.schedule.wholeWeek, id: 1, key: 'wholeWeek' },
    { label: i18n.schedule.twoAfterTwo, id: 4, key: 'twoAfterTwo' },
    { label: i18n.schedule.onWeekdays, id: 2, key: 'onWeekdays' },
    { label: i18n.schedule.onWeekends, id: 3, key: 'onWeekends' },
  ],
  queryAction: 'select',
  queryParam: 'interval_id',
  queryType: 'items',
}: IntervalGroupModel);

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
};
