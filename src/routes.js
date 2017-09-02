const routes = {};

const methods = [
  { createAddress: '/address', method: 'POST' },
  { createMaster: '/master-card', method: 'POST' },
  { createMasterServices: '/master-service', method: 'POST' },
  { geoAutoComplete: '/geo/autocomplete', method: 'GET' },
  { getCategoryServices: '/category-service', method: 'GET' },
  { getMasterById: '/master', method: 'GET' },
  { getServices: '/service', method: 'GET' },
  { getUserProfile: '/user/profile?include=master_cards', method: 'GET' },
  { refreshToken: '/refresh-token', method: 'POST' },
  { searchMasters: '/master/search', method: 'GET' },
  { upload: '/upload', method: 'POST' },
  { userCreate: '/user/registration', method: 'POST' },
  { userFavorites: '/favorites', method: 'GET' },
  { userLogin: '/token', method: 'POST' },
];

methods.forEach((methodObj) => {
  const routeName = Object.keys(methodObj)[0];

  routes[routeName] = {
    method: methodObj.method,
    path: methodObj[routeName],
  };
});

export const geoRoutes = {
  autocomplete: '/autocomplete/json',
  details: '/details/json',
};

export default routes;
