import i18n from '../../i18n';

const masterType = () => ({
  queryParam: 'master_type',
  items: [
    { label: i18n.filters.masterType.all, id: 1,  active: true},
    { label: i18n.filters.masterType.privateOnly, id: 2},
    { label: i18n.filters.masterType.salonOnly, id: 3},
  ]
});

const distances = () => ({
    items: [
      {label: i18n.location.here, meters: 400},
      {label: i18n.location.distance(500, true), meters: 500},
      {label: i18n.location.distance(1), meters: 1000},
      {label: i18n.location.distance(2), meters: 2000}
    ]
});

const addresses = () => ({
  selected: {},
  items: []
});

export default {
  masterType,
  distances,
  addresses,
};
