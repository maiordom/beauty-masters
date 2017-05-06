// @flow

import moment from 'moment';
import { connect } from 'react-redux';

import SerpCard from '../components/Serp/SerpCard';

const mockSnippet = {
  title: 'Марина Ф',
  photo: 'https://unsplash.it/48',
  type: 'Частный мастер',
  metroStation: 'Площадь Восстания',
  distance: '2,2',
  closestDate: moment(new Date()).add(1, 'd').format('YYYY-MM-DD'),
  services: [
    { id: 'Маникюр', price: 1000 },
    { id: 'Шеллак', price: 1800 },
    { id: 'Педикюр', price: 1100 },
  ],
};

const mapStateToProps = () => ({
  ...mockSnippet,
});

const mapDispatchToProps = () => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(SerpCard);
