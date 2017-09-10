// @flow

import routes from '../routes';
import { post } from '../utils/Provider';

export const getMasterById = (id: number) =>
  post(routes.getMasterById, { id });

export default null;
