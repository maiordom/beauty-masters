// @flow
import actions from '../constants/search';

export const setDay = (day: string) => ({
  type: actions.SEARCH_SET_DAY,
  day
});

export const setItemById = (modelName: string, id: number, sectionName: string) => ({
  type: actions.SEARCH_SET_MASTER_TYPE,
  modelName,
  id,
  sectionName
});

export const toogleService = (modelName: string, paramName: string, paramValue: boolean, sectionName: string) => ({
  type: actions.SEARCH_TOOGLE_SERVICE,
  modelName,
  paramName,
  paramValue,
  sectionName
});

export const toggleDeparture = () => ({ type: actions.SEARCH_DEPARTURE_TOGGLE });

type ActionSetItems = {
  type: string,
  items: Array<{
    label: string,
    id: number
  }>
};

// mock addresses
const addresses = [
  { label: 'Московская', id: 1 },
  { label: 'Петровская', id: 2 },
  { label: 'Васильевская', id: 3 },
  { label: 'Крутовская', id: 4 },
  { label: 'Змеевская', id: 5 },
  { label: 'Путевская', id: 6 },
  { label: 'Бульонская', id: 7 },
  { label: 'Макаронская', id: 8 },
  { label: 'Крашовская', id: 9 },
  { label: 'Питерская', id: 10 },
  { label: 'Ростовская', id: 11 },
  { label: 'Бельгийская', id: 12 },
  { label: 'Парийская', id: 13 },
  { label: 'Американская', id: 14 },
  { label: 'Бразильская', id: 15 },
  { label: 'Курская', id: 16 },
  { label: 'Буржская', id: 17 },
  { label: 'Кружская', id: 18 }
];

export const searchAddress = (address: string) =>
  (dispatch: (ActionSetItems) => null) => {
    // send request to backend
    // after send request to get address info
    dispatch({
      type: actions.SEARCH_ITEMS_SET,
      items: addresses.slice(0, address.length),
      modelName: 'addresses',
      sectionName: 'general'
    });
  };

export const addressesReset = () => ({
  type: actions.SEARCH_ITEMS_RESET,
  modelName: 'addresses',
  sectionName: 'general'
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
  { label: 'Щербинка', id: 2291 }
];

export const searchCities = (city: string) => (dispatch: (ActionSetItems) => null) => {
  dispatch({
    type: actions.SEARCH_ITEMS_SET,
    items: kladdrs.slice(0, city.length),
    modelName: 'cities',
    sectionName: 'general'
  });
};

export const citiesReset = () => ({ type: actions.SEARCH_ITEMS_RESET, modelName: 'cities', sectionName: 'general' });
