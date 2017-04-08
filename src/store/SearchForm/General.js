import i18n from '../../i18n';

const masterType = () => ({
    queryParam: 'master_type',
    items: [
        { label: i18n.filters.masterType.all, id: 1,  active: true},
        { label: i18n.filters.masterType.privateOnly, id: 2},
        { label: i18n.filters.masterType.salonOnly, id: 3},
    ]
});

const masterSchedule = building => ({
  queryParam: 'schedule',
  value: [],
});

export default {
  masterType,
  masterSchedule
};
