import i18n from '../../i18n';

const salonTitleField = salonTitle => ({
  queryParam: 'salon_title',
  value: salonTitle || null,
  label: i18n.name,
});

const cityField = city => ({
  queryParam: 'city',
  value: city || null,
  label: i18n.city,
});

const streetField = street => ({
  queryParam: 'street',
  value: street || null,
  label: i18n.street,
});

const districtField = district => ({
  queryParam: 'district',
  value: district || null,
  label: i18n.district,
});

const subwayStationField = district => ({
  queryParam: 'subway_station',
  value: district || null,
  label: i18n.subwayStation,
});

const houseField = house => ({
  queryParam: 'house',
  value: house || null,
  label: i18n.house,
});

const buildingField = building => ({
  queryParam: 'building',
  value: building || null,
  label: i18n.building,
});

const recipientsField = (recipients = {}) => ({
  startDate: recipients.start_date || null,
  timeStart: recipients.time_start || '10:00',
  timeEnd: recipients.time_end || '20:00',
});

const intervalGroup = () => ({
  queryParam: 'intervalId',
  items: [
    { label: i18n.schedule.wholeWeek, id: '1', key: 'wholeWeek' },
    { label: i18n.schedule.twoAfterTwo, id: '4', key: 'twoAfterTwo' },
    { label: i18n.schedule.onWeekdays, id: '2', key: 'onWeekdays' },
    { label: i18n.schedule.onWeekends, id: '3', key: 'onWeekends' },
  ]
});

export default {
  salonTitleField,
  cityField,
  streetField,
  districtField,
  subwayStationField,
  houseField,
  buildingField,
  recipientsField,
  intervalGroup,
};
