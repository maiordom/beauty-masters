import find from 'lodash/find';

import { makeReducer, groupServices, deepUpdate } from '../utils';
import { intervalGroup } from '../store/Interval';

import type { TProfileData, TMasterCard, TMasterAddress } from '../types/ProfileData';

import c from '../constants/Profile';

const intervalModel = intervalGroup();

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

        if (profileCard.status.addressesUploaded) {
          card.status.addressesUploaded = true;
        }

        if (profileCard.status.masterServicesUploaded) {
          card.status.masterServicesUploaded = true;
        }
      }
    });

    const mainCard: TMasterCard = find(masterCards, { isMain: true });

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

        address.timeTable.intervalKey = interval.key;
      });
    }

    return state;
  },

  [c.PROFILE_MASTER_SERVICES_SET]: (state, { payload: { masterServices, masterCardId } }) => {
    const masterCard: TMasterCard = find(state.profile.masterCards, { id: masterCardId });

    masterCard.masterServices = groupServices(masterServices, state.dictionaries);
    masterCard.status.masterServicesUploaded = true;

    return state;
  },
}));
