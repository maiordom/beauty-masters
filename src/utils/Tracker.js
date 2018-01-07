import { GoogleAnalyticsTracker } from 'react-native-google-analytics-bridge';
import each from 'lodash/each';

const tracker = new GoogleAnalyticsTracker('UA-112024586-1');

const searchEvents = each({
  viewMap: { label: '_map' },
  viewSerp: { label: '_serp' },
  navigateFromMapToCard: { label: '_map_card' },
  navigateFromSerpToCard: { label: '_serp_card' },
  callPhoneFromMap: { label: '_card_phone_map' },
  callPhoneFromSerp: { label: '_card_phone_serp' },
  availableUserLocation: { label: '_users_address_identified' },
  notAvailableUserLocation: { label: '_users_address_not_identified' },
  hasSearchAddress: { label: '_users_address_added' },
}, (event) => {
  event.category = 'users';
  event.action = 'search';
});

const eventsMapping = {
  ...searchEvents,
};

export const trackEvent = (eventName, options = {}) => {
  const { category, action, label } = eventsMapping[eventName];

  tracker.trackEvent(
    category,
    action,
    { label, ...options },
  );

  console.log(
    category,
    action,
    { label, ...options },
  );
};
