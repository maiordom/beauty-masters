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

type ActionSetAddresses = {
  type: string,
  items: Array<{
    label: string,
    id: number
  }>
};

// mock addresses
const addresses = [
  {
    label: 'Московская',
    id: 1
  },
  {
    label: 'Петровская',
    id: 2
  },
  {
    label: 'Васильевская',
    id: 3
  },
  {
    label: 'Крутовская',
    id: 4
  },
  {
    label: 'Змеевская',
    id: 5
  },
  {
    label: 'Путевская',
    id: 6
  },
  {
    label: 'Бульонская',
    id: 7
  },
  {
    label: 'Макаронская',
    id: 8
  },
  {
    label: 'Крашовская',
    id: 9
  },
  {
    label: 'Питерская',
    id: 10
  },
  {
    label: 'Ростовская',
    id: 11
  },
  {
    label: 'Бельгийская',
    id: 12
  },
  {
    label: 'Парийская',
    id: 13
  },
  {
    label: 'Американская',
    id: 14
  },
  {
    label: 'Бразильская',
    id: 15
  },
  {
    label: 'Курская',
    id: 16
  },
  {
    label: 'Буржская',
    id: 17
  },
  {
    label: 'Кружская',
    id: 18
  }
];
export const searchAddress = (address: string) =>
  (dispatch: (ActionSetAddresses) => null) => {
    // send request to backend
    // after send request to get address info
    dispatch({ type: actions.SEARCH_ADDRESSES_SET, items: addresses.slice(0, address.length) });
  };
export const addressesReset = () => ({ type: actions.SEARCH_ADDRESSES_RESET });
export const toggleDeparture = () => ({ type: actions.SEARCH_DEPARTURE_TOGGLE });
