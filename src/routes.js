const routes = {};

const methods = [
  { createAddress: '/address', method: 'POST' },
  { createCertificatePhoto: '/certificate-photo', method: 'POST' },
  { createMaster: '/master-card', method: 'POST' },
  { createMasterPhoto: '/master-photo', method: 'POST' },
  { createMasterServices: '/master-service', method: 'POST' },
  { createPortfolioPhoto: '/portfolio-photo', method: 'POST' },
  { createSchedules: '/schedule', method: 'POST' },
  { createTimeTable: '/timetable', method: 'POST' },
  { deleteCertificatePhoto: ({ id }) => `/certificate-photo/${id}`, method: 'DELETE' },
  { deleteMasterPhoto: ({ id }) => `/master-photo/${id}`, method: 'DELETE' },
  { deletePortfolioPhoto: ({ id }) => `/portfolio-photo/${id}`, method: 'DELETE' },
  { geoAutoComplete: '/geo/autocomplete', method: 'GET' },
  { getAddress: '/address', method: 'GET' },
  { getCategoryServices: '/category-service', method: 'GET' },
  { getCities: '/city', method: 'GET' },
  { getMasterById: ({ id }) => `/master-card/${id}`, method: 'GET' },
  { getMasterServices: '/master-service', method: 'GET' },
  { getServices: '/service', method: 'GET' },
  { getSubwayStations: '/subway-station', method: 'GET' },
  { getUserProfile: '/user/profile', method: 'GET' },
  { refreshToken: '/refresh-token', method: 'POST' },
  { searchMasters: '/search-master', method: 'GET' },
  { sendFeedback: '/feedback', method: 'POST' },
  { sendResetPasswordLink: '/user/request-password-reset', method: 'POST' },
  { updateAddress: ({ id }) => `/address/${id}`, method: 'PATCH' },
  { updateMaster: ({ id }) => `/master-card/${id}`, method: 'PATCH' },
  { updateTimeTable: ({ id }) => `/timetable/${id}`, method: 'PATCH' },
  { upload: (type) => `/upload/${type}`, method: 'POST' },
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
