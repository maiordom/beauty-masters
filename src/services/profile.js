// @flow

import camelcaseKeys from 'camelcase-keys';

import routes from '../routes';
import { post } from '../utils/provider';

import profileData from '../test/ProfileData';

import type { ProfileData } from '../types/ProfileData';

export function getUserProfile() {
  return post(routes.getUserProfile, {})
    .then(() => camelcaseKeys((profileData: ProfileData), { deep: true })); // here we will fetch real data
}
