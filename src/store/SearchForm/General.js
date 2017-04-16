import i18n from '../../i18n';

const masterType = () => ({
  queryParam: 'master_type',
  items: [
    { label: i18n.filters.masterType.all, id: 1, active: true },
    { label: i18n.filters.masterType.privateOnly, id: 2 },
    { label: i18n.filters.masterType.salonOnly, id: 3 },
  ],
});

const distances = () => ({
  items: [
    { label: i18n.location.here, meters: 400 },
    { label: i18n.location.distance(500, true), meters: 500 },
    { label: i18n.location.distance(1), meters: 1000 },
    { label: i18n.location.distance(2), meters: 2000 },
  ],
});

const addresses = () => ({
  selected: {},
  items: [],
});

const kladdrs = [
  { label: 'Москва и область', id: 201046 },
  { label: 'Московская область', id: 44 },
  { label: 'Москва', id: 175849 },
  { label: 'Подольск', id: 2330 },
  { label: 'Красногорск', id: 2312 },
  { label: 'Балашиха', id: 2295 },
  { label: 'Одинцово', id: 2321 },
  { label: 'Раменское', id: 2332 },
  { label: 'Пушкино', id: 2331 },
  { label: 'Химки', id: 2340 },
  { label: 'Мытищи', id: 2317 },
  { label: 'Люберцы', id: 2315 },
  { label: 'Королёв', id: 2280 },
  { label: 'Домодедово', id: 2300 },
  { label: 'Долгопрудный', id: 2318 },
  { label: 'Щелково', id: 2347 },
  { label: 'Видное', id: 2313 },
  { label: 'Лобня', id: 2283 },
  { label: 'Павлоский-Посад', id: 2328 },
  { label: 'Чехов', id: 2341 },
  { label: 'Реутов', id: 2287 },
  { label: 'Долгопрудный', id: 2318 },
  { label: 'Ногинск', id: 2319 },
  { label: 'Электросталь', id: 2292 },
  { label: 'Дзержинский', id: 2294 },
  { label: 'Ивантеевка', id: 2278 },
  { label: 'Железнодорожный', id: 2275 },
  { label: 'Троицк', id: 2289 },
  { label: 'Московский', id: 75260 },
  { label: 'Щербинка', id: 2291 },
];

const cities = () => ({
  selected: kladdrs[0],
  items: kladdrs,
});

export default {
  masterType,
  distances,
  addresses,
  cities,
};
