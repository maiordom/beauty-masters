// @flow

export type TMasterCard = {};

export type TMapCard = {
  address: string,
  closestDate: string,
  coordinates: {
    latitude: number,
    longitude: number,
  },
  id: number,
  masterType: number,
  photo: string,
  services: {
    duration: string,
    id: number,
    price: number,
    title: string,
  })),
  username: string,
};
