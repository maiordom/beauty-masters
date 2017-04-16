/* @flow */

type CalendarFieldModel = {
  label: string,
  queryParam: string,
  value: string | null,
};

type RecipientFieldModel = {
  parentQueryParam: string,
  queryParam: string,
  value: string | null,
};

type CustomDatesModel = {
  items: Array<any>,
  parentQueryParam: string,
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
  parentQueryParam: string,
  queryParam: string,
};

import i18n from '../../i18n';

const salonTitleField = (salonTitle: string) => ({
  label: i18n.name,
  queryParam: 'salon_title',
  queryType: 'value',
  value: salonTitle || null,
}: CalendarFieldModel);

const cityField = (city: string) => ({
  label: i18n.city,
  queryParam: 'city',
  queryType: 'value',
  value: city || null,
}: CalendarFieldModel);

const streetField = (street: string) => ({
  label: i18n.street,
  queryParam: 'street',
  queryType: 'value',
  value: street || null,
}: CalendarFieldModel);

const districtField = (district: string) => ({
  label: i18n.district,
  queryParam: 'district',
  value: district || null,
}: CalendarFieldModel);

const subwayStationField = (district: string) => ({
  label: i18n.subwayStation,
  queryParam: 'subway_station',
  queryType: 'value',
  value: district || null,
}: CalendarFieldModel);

const houseField = (house: string) => ({
  label: i18n.house,
  queryParam: 'house',
  queryType: 'value',
  value: house || null,
}: CalendarFieldModel);

const buildingField = (building: string) => ({
  label: i18n.building,
  queryParam: 'building',
  queryType: 'value',
  value: building || null,
}: CalendarFieldModel);

const timeStartField = ({ time_start }: { time_start: string } = {}) => ({
  parentQueryParam: 'recipients',
  queryParam: 'time_start',
  queryType: 'value',
  value: time_start || '10:00',
}: RecipientFieldModel);

const timeEndField = ({ time_end }: { time_end: string } = {}) => ({
  parentQueryParam: 'recipients',
  queryParam: 'time_end',
  queryType: 'value',
  value: time_end || '20:00',
}: RecipientFieldModel);

const startDateField = ({ start_date }: { start_date: string } = {}) => ({
  parentQueryParam: 'recipients',
  queryParam: 'start_date',
  queryType: 'value',
  value: start_date || null,
}: RecipientFieldModel);

const customDates = () => ({
  items: [],
  parentQueryParam: 'recipients',
  queryAction: 'fill',
  queryParam: 'custom_recipients',
  queryParamMapping: {
    date: 'date',
    status: 'active',
    timeEnd: 'end_time',
    timeStart: 'start_time',
  },
  fromQueryParamMapping: {
    date: 'date',
    active: 'status',
    end_time: 'timeEnd',
    start_time: 'timeStart',
  },
  queryType: 'items',
  timeEndDefault: '20:00',
  timeStartDefault: '10:00',
}: CustomDatesModel);

const intervalGroup = () => ({
  items: [
    { label: i18n.schedule.wholeWeek, id: '1', key: 'wholeWeek' },
    { label: i18n.schedule.twoAfterTwo, id: '4', key: 'twoAfterTwo' },
    { label: i18n.schedule.onWeekdays, id: '2', key: 'onWeekdays' },
    { label: i18n.schedule.onWeekends, id: '3', key: 'onWeekends' },
  ],
  parentQueryParam: 'recipients',
  queryAction: 'select',
  queryParam: 'interval_id',
  queryType: 'items',
}: IntervalGroupModel);

export default {
  salonTitleField,
  cityField,
  streetField,
  districtField,
  subwayStationField,
  houseField,
  buildingField,
  timeStartField,
  timeEndField,
  startDateField,
  intervalGroup,
  customDates,
};
