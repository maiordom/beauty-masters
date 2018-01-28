import i18n from '../../i18n';

const masterType = () => ({
  queryParam: 'master_type',
  items: [
    { label: i18n.filters.masterType.all, id: 1, active: true, value: null },
    { label: i18n.filters.masterType.privateOnly, id: 2, value: '0' },
    { label: i18n.filters.masterType.salonOnly, id: 3, value: '1' },
  ],
});

const cities = () => ({
  selected: {
    id: 1,
    name: 'Москва',
    lat: 55.753994,
    lon: 37.622093,
  },
  items: [],
  filtered: null,
});

const place = () => ({
  label: null,
});

export default {
  cities,
  masterType,
  place,
};
