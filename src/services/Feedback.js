import { post } from '../utils/Provider';
import routes from '../routes';

export const sendFeedback = (params) =>
  post(routes.sendFeedback, params);

export default null;
