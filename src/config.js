const common = {
  googlePlacesHost: 'https://maps.googleapis.com/maps/api/place',
  googlePlacesKey: 'AIzaSyD7u--7uoorLS369FEIpdwjxB5fMPjrrnU',
};

const live = {
  host: 'http://api.relak.me',
};

/* eslint-disable no-unused-vars */
const qa = {
  host: 'http://api.pilochki.demostage.ru',
};

export default Object.assign({}, common, live);
