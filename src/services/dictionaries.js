import routes from '../routes';
import { post } from '../utils/provider';

export function getDictionaries() {
  return post(routes.getDictionaries, {})
    .then(response => (response.result && {
      services: response.result.data.services.map(service => ({
        id: service.Id,
        key: service.Key,
        title: service.Title,
        description: service.Description,
        parentServiceId: service.ParentServiceId,
      })),
    } || {
      services: []
    }));
}
