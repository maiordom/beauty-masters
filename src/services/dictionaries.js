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
      services: [],
    }));
}

export function getCategoryServices() {
  return get(routes.getCategoryServices)
    .then(response => (response.data && {
      categoryServices: response.data.map(categoryService => ({
        id: categoryService.id,
        key: categoryService.attributes.key,
      })),
    } || {
      categoryServices: [],
    }));
}

export default null;
