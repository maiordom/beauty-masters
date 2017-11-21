import i18n from '../../i18n';

const masterType = () => ({
  queryParam: 'master_type',
  items: [
    { label: i18n.filters.masterType.all, id: 1, active: true },
    { label: i18n.filters.masterType.privateOnly, id: 2 },
    { label: i18n.filters.masterType.salonOnly, id: 3 },
  ],
});

const kladdrs = [
  { label: 'Москва и область' },
];

const cities = () => ({
  selected: kladdrs[0],
  items: kladdrs,
});

export default {
  cities,
  masterType,
};
