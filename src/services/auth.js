import routes from '../routes';
import { post } from '../utils/provider';

export const userCreate = (params) => post(routes.userCreate, params);
