import find from 'lodash/find';

import { makeReducer, groupServices, deepUpdate } from '../utils';
import { intervalGroup } from '../store/Interval';

import type { TProfileData } from '../types/ProfileData';

import c from '../constants/Profile';

const intervalModel = intervalGroup();

export default makeReducer((state, action) => ({
  [c.PROFILE_SECTION_SET]: (state, { payload: { sectionKey } }) =>
    deepUpdate(state, 'profile', { sectionKey }),

  [c.PROFILE_DATA_SET]: (state, { payload: { email, userId, masterCards } }) => {
    const profile: TProfileData = {
      email,
      masterCards,
      sectionKey: state.profile.sectionKey,
      userId,
    };

    masterCards.forEach((card) => {
      const profileCard = find(state.profile.masterCards, { id: card.id });

      if (profileCard) {
        card.addresses = profilceCard.addresses;
        card.masterServices = profileCard.masterServices;
      }
    });

    const mainCard = find(masterCards, { isMain: true });

    state.masterEditor.masterCardId = mainCard && mainCard.id || null;
    state.profile = profile;

    return state;
  },

  [c.PROFILE_MAIN_SET]: (state, { payload: { index } }) => {
    state.profile.masterCards.forEach((card, masterIndex) => {
      card.isMain = masterIndex === index;
    });

    state.masterEditor.masterCardId = find(masterCards, { isMain: true }).id;
    state.profile.masterCards = [...state.profile.masterCards];

    return state;
  },

  [c.PROFILE_ADDRESSES_SET]: (state, { payload: { addresses, masterCardId } }) => {
    const masterCard = find(state.profile.masterCards, { id: masterCardId });

    if (masterCard) {
      masterCard.addresses = addresses;
      masterCard.status.addressesUploaded = true;

      addresses.forEach(address => {
        const interval = find(intervalModel.items, { id: address.timeTable.intervalType });

        address.timeTable.intervalKey = interval.key;
      });
    }

    return state;
  },

  [c.PROFILE_MASTER_SERVICES_SET]: (state, { payload: { masterServices, masterCardId } }) => {
    const masterCard = find(state.profile.masterCards, { id: masterCardId });

    masterCard.masterServices = groupServices(masterServices, state.dictionaries);
    masterCard.status.masterServicesUploaded = true;

    return state;
  },
}));
