import { GoogleAnalyticsTracker } from 'react-native-google-analytics-bridge';
import each from 'lodash/each';

const tracker = new GoogleAnalyticsTracker('UA-112024586-1');

const searchEvents = each({
  availableUserLocation: { label: '_users_address_identified' },
  callPhoneFromMap: { label: '_card_phone_map' },
  callPhoneFromSerp: { label: '_card_phone_serp' },
  hasSearchAddress: { label: '_users_address_added' },
  navigateFromMapToCard: { label: '_map_card' },
  navigateFromSerpToCard: { label: '_serp_card' },
  notAvailableUserLocation: { label: '_users_address_not_identified' },
  viewMap: { label: '_map' },
  viewSerp: { label: '_serp' }
}, (event) => {
  event.category = 'users';
  event.action = 'search';
});

const filterEvents = each({
  selectFilterExtension: { label: '_filters_main_extension' },
  selectFilterManicure: { label: '_filters_main_manicure' },
  selectFilterPedicure: { label: '_filters_main_pedicure' },
  selectFilterRemove: { label: '_filters_main_remove' },
  selectService: { label: (serviceName) => `_filters_minor_${serviceName}` }
}, (event) => {
  event.category = 'users';
  event.action = 'filters';
});

const favoriteEvents = each({
  addToFavorites: { label: '_favorite_user' }
}, (event) => {
  event.category = 'users';
  event.action = 'favorite';
});

const accountsEvents = each({
  step0: { label: 'step_0' },
  step1Salon: { label: 'step_1_salon' },
  step1Private: { label: 'step_1_private' },
  step2Private: { label: 'step_2_private' },
  step2PrivateSelectPedicure: { label: 'step_2_private_pedicure_visit' },
  step2PrivateManicureServicesCount: { label: (count) => `step_2_private_manicure_services_${count}` },
  step2PrivatePedicureServicesCount: { label: (count) => `step_2_private_pedicure_services_${count}` },
  step2PrivateManicureCustomServicesCount: { label: (count) => `step_2_private_manicure_custom_services_${count}`, },
  step2PrivatePedicureCustomServicesCount: { label: (count) => `step_2_private_pedicure_custom_services_${count}` },
  step2Salon: { label: 'step_2_salon' },
  step2SalonSelectPedicure: { label: 'step_2_salon_pedicure_visit' },
  step2SalonManicureServicesCount: { label: (count) => `step_2_salon_manicure_services_${count}` },
  step2SalonPedicureServicesCount: { label: (count) => `step_2_salon_pedicure_services_${count}` },
  step2SalonManicureCustomServicesCount: { label: (count) => `step_2_salon_manicure_custom_services_${count}` },
  step2SalonPedicureCustomServicesCount: { label: (count) => `step_2_salon_pedicure_custom_services_${count}` },
  step3Salon: { label: 'step_3_salon' },
  step3Private: { label: 'step_3_private' },
  step4Salon: { label: 'step_4_salon' },
  step4Private: { label: 'step_4_private' },
  step4SalonCalendarsCount: { label: (count) => `step_4_salon_calendars_${count}` },
  step4PrivateCalendarsCount: { label: (count) => `step_4_private_calendars_${count}` },
  step5Salon: { label: 'step_5_salon' },
  step5SalonMasterPhotoCount: { label: (count) => `step_5_salon_master_photo_${count}` },
  step5SalonCertificatePhotoCount: { label: (count) => `step_5_salon_certificate_photo_${count}` },
  step5SalonPortfolioPhotoCount: { label: (count) => `step_5_salon_portfolio_${count}` },
  step5Private: { label: 'step_5_private' },
  step5PrivateMasterPhotoCount: { label: (count) => `step_5_private_master_photo_${count}` },
  step5PrivateCertificatePhotoCount: { label: (count) => `step_5_private_certificate_photo_${count}` },
  step5PrivatePortfolioPhotoCount: { label: (count) => `step_5_private_portfolio_${count}` },
  step6Salon: { label: 'step_6_salon' },
  step6SalonSuccess: { label: 'step_6_salon_success' },
  step6SalonMore: { label: 'step_6_salon_more' },
  step6Private: { label: 'step_6_private' },
  step6PrivateSuccess: { label: 'step_6_private_success' },
  step6PrivateMore: { label: 'step_6_private_more' },
  masterRegistration: { label: (count) => `master_${count}`, action: 'reg_more_masters' },
  changeCalendar: { label: 'change_calendar', action: 'account' },
  changeProfile: { label: 'change_profile', action: 'account' },
  changeServices: { label: 'change_services', action: 'account' },
  changeHandlingTools: { label: 'change_handling_tools', action: 'account' },
  changePhoto: { label: 'change_photo', action: 'account' },
  authByemail: { action: 'auth_by_email' },
  viewAuth: { action: 'auth_view' },
  viewReg: { action: 'reg_view' }
}, (event) => {
  event.category = 'accounts';

  if (!event.action) {
    event.action = 'master_registration';
  }
});

const eventsMapping = {
  ...accountsEvents,
  ...favoriteEvents,
  ...filterEvents,
  ...searchEvents
};

export const trackEvent = (eventName, option = {}) => {
  let { category, action, label } = eventsMapping[eventName];

  if (typeof label === 'function') {
    label = label(option.labelValue);
  }

  console.log(
    'Tracker::Event',
    category,
    action,
    { label },
  );

  tracker.trackEvent(
    category,
    action,
    { label },
  );
};
