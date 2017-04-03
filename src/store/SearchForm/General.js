import i18n from '../../i18n';

const masterType = () => ({
    queryParam: 'master_type',
    items: [
        { label: i18n.filters.masterType.all, active: true, id: 1},
        { label: i18n.filters.masterType.privateOnly, id: 2},
        { label: i18n.filters.masterType.salonOnly, id: 3},
    ]
});

export default {
    masterType
};
