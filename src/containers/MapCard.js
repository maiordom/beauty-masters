// @flow

import moment from 'moment';
import { connect } from 'react-redux';

import MapCard from '../components/Serp/MapCard';

import type { MapCardType } from '../types/MasterTypes';

const mockSnippet : MapCardType = {
  photo: 'https://unsplash.it/48',
  title: 'Марина Ф',
  subtitle: 'Частный мастер',
  address: 'Площадь Восстания',
  distance: '2,2',
  closestDate: moment(new Date()).add(1, 'd').format('YYYY-MM-DD'),
  services: [
    { serviceId: 'Маникюр', price: 1000, duration: '55' },
    { serviceId: 'Шеллак', price: 1800, duration: '60' },
    { serviceId: 'Педикюр', price: 1100, duration: '70' },
  ],
};

const mapStateToProps = () => ({
  ...mockSnippet,
});

const mapDispatchToProps = () => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(MapCard);
