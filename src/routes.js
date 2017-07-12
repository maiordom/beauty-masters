import config from './config';

const routes = {
  upload: `${config.host}/upload`,
};

const methods = [
  { createMaster: 'master.createMaster' },
  { geoAutoComplete: 'geo.autocomplete' },
  { getDictionaries: 'dictionary.getDictionaries' },
  { userCreate: 'user.create' },
  { searchMasters: 'master.search' },
  { getMasterById: 'master.getById' },
  { getUserProfile: 'user.getProfile' /* fix it after */},
];

methods.forEach((method, index) => {
  const routeName = Object.keys(method)[0];

  routes[routeName] = {
    id: index,
    method: method[routeName],
  };
});

export default routes;
