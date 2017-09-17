import routes from '../routes';
import { get } from '../utils/Provider';

export function getServices() {
  return get(routes.getServices)
    .then(res => (res.data && {
      services: res.data.map(service => ({
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
    .then(res => (res.data && {
      categoryServices: res.data.map(categoryService => ({
        id: categoryService.id,
        key: categoryService.attributes.key,
        parentId: categoryService.attributes.parent_id,
        title: categoryService.attributes.title,
      })),
    } || {
      categoryServices: [],
    }));
}

export default null;
