/* @flow */

import moment from 'moment';

import type { CreateMasterQuery } from '../types/CreateMasterQuery';

const createMasterQuery: CreateMasterQuery = {
  certificates: [],
  username: 'Вадим',
  is_salon: true,
  manicure_custom_services: [],
  master_addresses: [
    {
      building: '3',
      city: 'Москва',
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
      district: 'Головинский',
      house: '4',
      interval_id: 4,
      salon_title: 'У Вики дома',
      start_date: moment().format('YYYY-MM-DD'),
      street: '1-ый Лихачевский переулок',
      subway_station: 'Водный стадион',
      time_end: '21:20',
      time_start: '13:30',
    },
  ],
  master_photos: [],
  pedicure_custom_services: [],
  phone: '89264978293',
  salon_name: 'У Вики дома',
  services: [
    {
      service_id: 67, // UltraViolet
    },
    {
      service_id: 66, // UltraSound
    },
    {
      duration: '60',
      price: 1000,
      service_id: 3, // ClassicManicure
    },
    {
      duration: '56',
      price: 700,
      service_id: 35, // ClassicPedicure
    },
  ],
  work_photos: [],
};

export default createMasterQuery;
