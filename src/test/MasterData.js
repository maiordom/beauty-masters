/* @flow */

import moment from 'moment';

import type { CreateMasterQuery } from '../types';

const createMasterQuery: CreateMasterQuery = {
  address: [
    {
      city: 'Москва',
      district: 'Головинский',
      street: '1-ый Лихачевский переулок',
      house: '4',
      building: '3',
      subway_station: 'Водный стадион',
      salon_title: 'У Вики дома',
      recipients: {
        custom_recipients: [
          {
            active: true,
            date: moment().add(1, 'day').format('YYYY-MM-DD'),
            end_time: '11:40',
            start_time: '19:00',
          },
          {
            active: true,
            date: moment().add(2, 'day').format('YYYY-MM-DD'),
            end_time: '10:10',
            start_time: '15:00',
          },
        ],
        interval_id: '4',
        start_date: moment().format('YYYY-MM-DD'),
        time_end: '21:20',
        time_start: '13:30',
      },
    }
  ],
  certificates: [],
  custom_services: [],
  first_name: 'Вадим',
  is_salon: true,
  last_name: 'Жуланов',
  master_photos: [],
  passport: '',
  phone: '89264978293',
  salon_name: 'У Вики дома',
  services: [
    {
      service_id: '67', // UltraViolet
    },
    {
      service_id: '66', // UltraSound
    },
    {
      duration: 60,
      price: 1000,
      service_id: '3', // ClassicManicure
    },
    {
      duration: 56,
      price: 700,
      service_id: '35', // ClassicPedicure
    }
  ],
  work_photos: [],
};

export default createMasterQuery;
