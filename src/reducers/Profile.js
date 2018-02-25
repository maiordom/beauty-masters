import find from 'lodash/find';
import reject from 'lodash/reject';
import includes from 'lodash/includes';

import {
  deepUpdate,
  groupServices,
  makeReducer,
} from '../utils';
import { intervalGroup } from '../store/Interval';

import type { TProfileData, TMasterCard, TMasterAddress } from '../types/ProfileData';

import c from '../constants/Profile';

const intervalModel = intervalGroup();

const HOME_DEPARTURE_MANICURE_SERVICE_ID = 61;
const HOME_DEPARTURE_PEDICURE_SERVICE_ID = 62;
const HOME_DEPARTURE_SERVICE_IDS = [
  HOME_DEPARTURE_MANICURE_SERVICE_ID,
  HOME_DEPARTURE_PEDICURE_SERVICE_ID,
];

const filterHomeDepartureService = (masterServices) => {
  const filteredMasterServices = reject(masterServices, (service) =>
    includes(HOME_DEPARTURE_SERVICE_IDS, service.serviceId));

  const homeDepartureService = find(masterServices, (service) =>
    service.serviceId === HOME_DEPARTURE_MANICURE_SERVICE_ID ||
    service.serviceId === HOME_DEPARTURE_PEDICURE_SERVICE_ID);

  return {
    filteredMasterServices,
    homeDepartureService,
  };
};

export default makeReducer(() => ({
  [c.PROFILE_SECTION_SET]: (state, { payload: { sectionKey } }) =>
    deepUpdate(state, 'profile', { sectionKey }),

  [c.PROFILE_DATA_SET]: (state, { payload: { email, userId, masterCards } }) => {
    const profile: TProfileData = {
      email,
      masterCards,
      sectionKey: state.profile.sectionKey,
      userId,
    };

    masterCards.forEach((card: TMasterCard) => {
      const profileCard: TMasterCard = find(state.profile.masterCards, { id: card.id });

      if (profileCard) {
        card.addresses = profileCard.addresses;
        card.masterServices = profileCard.masterServices;
        card.groupedMasterServices = profileCard.groupedMasterServices;

        if (profileCard.status.addressesUploaded) {
          card.status.addressesUploaded = true;
        }

        if (profileCard.status.masterServicesUploaded) {
          card.status.masterServicesUploaded = true;
        }
      }
    });

    const currentMainCard = find(state.profile.masterCards, { isMain: true });
    let mainCard: TMasterCard = find(masterCards, { isMain: true });

    if (currentMainCard) {
      mainCard = find(masterCards, { id: currentMainCard.id });
      masterCards.forEach((card: TMasterCard) => {
        card.isMain = card.id === mainCard.id;
      });
    }

    state.masterEditor.masterCardId = mainCard && mainCard.id || null;
    state.profile = profile;

    return state;
  },

  [c.PROFILE_MAIN_SET]: (state, { payload: { index } }) => {
    const { masterCards } = state.profile;

    masterCards.forEach((card: TMasterCard, masterIndex: number) => {
      card.isMain = masterIndex === index;
    });

    state.masterEditor.masterCardId = find(masterCards, { isMain: true }).id;
    state.profile.masterCards = [...state.profile.masterCards];

    return state;
  },

  [c.PROFILE_ADDRESSES_SET]: (state, { payload: { addresses, masterCardId } }) => {
    const masterCard: TMasterCard = find(state.profile.masterCards, { id: masterCardId });

    if (masterCard) {
      masterCard.addresses = addresses;
      masterCard.status.addressesUploaded = true;

      addresses.forEach((address: TMasterAddress) => {
        const interval = find(intervalModel.items, { id: address.timeTable.intervalType });

        if (interval) {
          address.timeTable.intervalKey = interval.key;
        }
      });
    }

    return state;
  },

  [c.PROFILE_MASTER_SERVICES_SET]: (state, { payload: { masterServices, masterCardId } }) => {
    const masterCard: TMasterCard = find(state.profile.masterCards, { id: masterCardId });
    const {
      filteredMasterServices,
      homeDepartureService,
    } = filterHomeDepartureService(masterServices);

    const groupedServices = groupServices(filteredMasterServices, state.dictionaries);

    masterCard.homeDepartureService = homeDepartureService;
    masterCard.masterServices = groupedServices.groupedServicesByCategories;
    masterCard.groupedMasterServices = groupedServices.groupedServicesBySubCategories;
    masterCard.status.masterServicesUploaded = true;

    return state;
  },
}));
