import routes from '../routes';
import { get } from '../utils/provider';

export function getServices() {
  return get(routes.getServices)
    .then(response => (response.data && {
      services: response.data.map(service => ({
        id: service.id,
        key: service.attributes.key,
        title: service.attributes.title,
        categoryId: service.attributes.category_id,
      })),
    } || {
      services: []
    }));
}
