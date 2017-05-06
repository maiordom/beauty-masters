// @flow

const masterData = {
  id: 1,
  userId: 1,
  firstName: 'Елена',
  lastName: 'Трепышина',
  phone: '+79613045087',
  MasterType: 1,
  masterCity: 'Москва',
  isSalon: true,
  salonName: 'Пилки',
  status: 1,
  masterPhoto: [
    'http://nadezhdaivera.ru/wp-content/uploads/2012/10/master-manikyura-nordos.png',
    'http://www.pro-rubin.ru/wp-content/uploads/2016/10/51.jpg',
  ],
  workPhoto: [
    'https://besplatka.ua/aws/8/40/47/79/9f2e6a42413e.jpg',
    'http://fashionstylist.kupivip.ru/sites/fashion-kupivip/files/styles/step_full/public/main-16399-f7a7cef06f1fdec5eafacd10f923267e.jpg',
    'http://aqualife21.ru/wp-content/uploads/2015/01/master_nogt_servisa.jpg',
    'https://bizhint.net/wp-content/uploads/2016/12/pokraska-nogtey-lakom.jpg',
    'http://static.wixstatic.com/media/5c07a0_c065cc80ca1245d39896ec954da769e5.jpg',
  ],
  has_certificates: false,
  certificates: null,
  about: null,
  vkProfile: 'https://vk.com/bsops',
  inProfile: 'https://www.instagram.com/heledirn/',
  fbProfile: null,
  okProfile: null,
  site_url: null,
  rating: null,
  services: [
    {
      id: 3,
      master_id: 1,
      service_id: 3,
      price: 800,
      duration: '30',
    },
    {
      id: 5,
      master_id: 1,
      service_id: 5,
      price: 950,
      duration: '40',
    },
    {
      id: 13,
      master_id: 1,
      service_id: 13,
      price: 1000,
      duration: '35',
    },

    {
      id: 35,
      master_id: 1,
      service_id: 35,
      price: 1100,
      duration: '50',
    },
    {
      id: 41,
      master_id: 1,
      service_id: 41,
      price: 1200,
      duration: '60',
    },
    {
      id: 47,
      master_id: 1,
      service_id: 47,
      price: 1250,
      duration: '55',
    },
  ],
};

export const equipmentInfo = [
  'Ультразвук, Ультрафиолет, Дезинфекция раствором спиртом устраняет грибковую и бактериальную флору',
  'Гласперленовый стерилизатор',
  'Стерилизация в специальном аппарате под воздействием высокой температуры',
];

export default masterData;
