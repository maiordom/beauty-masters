import config from './config';

const routes = {
  upload: `${config.host}/upload`,
};

const methods = [
  { registerUser: 'user.registerUser' },
  { geoAutoComplete: 'geo.autocomplete' },
];

methods.forEach((method, index) => {
  const routeName = Object.keys(method)[0];

  routes[routeName] = {
    id: index,
    method: method[routeName],
  };
});

export default routes;
