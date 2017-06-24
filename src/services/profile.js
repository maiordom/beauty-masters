import routes from '../routes';
import { post } from '../utils/provider';

import profileData from '../test/ProfileData';

export function getUserProfile() {
  return post(routes.getUserProfile, {})
    .then(() => profileData); // here we will fetch real data
}
