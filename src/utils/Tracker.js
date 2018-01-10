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
  selectFilterExtension: { label: '_filters_main_extension', action: 'filters' },
  selectFilterManicure: { label: '_filters_main_manicure', action: 'filters' },
  selectFilterPedicure: { label: '_filters_main_pedicure', action: 'filters' },
  selectFilterRemove: { label: '_filters_main_remove', action: 'filters' },
  selectService: { label: '_filters_minor_%service_name%', action: 'filters' },
  viewMap: { label: '_map' },
  viewSerp: { label: '_serp' },
}, (event) => {
  event.category = 'users';

  if (!event.action) {
    event.action = 'search';
  }
});

const favoriteEvents = each({
  addToFavorites: { label: '_favorite_user' }
}, (event) => {
  event.category = 'users';
  event.action = 'favorite';
});

const eventsMapping = {
  ...favoriteEvents,
  ...searchEvents,
};

export const trackEvent = (eventName, options = {}) => {
  const { category, action, label } = eventsMapping[eventName];

  console.log(
    'Tracker::Event',
    category,
    action,
    { label, ...options },
  );

  tracker.trackEvent(
    category,
    action,
    { label, ...options },
  );
};
