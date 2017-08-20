import config from './config';

const routes = {};

const methods = [
  { upload: '/upload', method: 'POST' },
  { createMaster: '/master-card', method: 'POST' },
  { geoAutoComplete: '/geo/autocomplete', method: 'GET' },
  { getServices: '/service', method: 'GET' },
  { userCreate: '/user/registration', method: 'POST' },
  { userLogin: '/token', method: 'POST' },
  { userFavorites: '/favorites', method: 'GET' },
  { searchMasters: '/master/search', method: 'GET' },
  { getMasterById: '/master', method: 'GET' },
  { getUserProfile: '/profile', method: 'GET' },
];

methods.forEach((methodObj, index) => {
  const routeName = Object.keys(methodObj)[0];

  routes[routeName] = {
    method: methodObj.method,
    path: methodObj[routeName],
  };
});

export default routes;
