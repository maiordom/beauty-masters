import routes from '../routes';
import { get } from '../utils/Provider';

import { TDictionaryService, TDictionaryCategoryService } from '../types/Dictionary';

export const prepareServices = (data) => data.map((service) => ({
  id: Number(service.id),
  key: service.attributes.key,
  title: service.attributes.title,
  categoryId: service.attributes.category_id,
}: TDictionaryService));

export const prepareCategoryServices = (data) => data.map((categoryService) => ({
  id: Number(categoryService.id),
  key: categoryService.attributes.key,
  parentId: categoryService.attributes.parent_id,
  title: categoryService.attributes.title,
}: TDictionaryCategoryService));

export function getServices() {
  return get(routes.getServices)
    .then(res => (res.data && {
      services: prepareServices(res.data),
    } || {
      services: [],
    }));
}

export function getCategoryServices() {
  return get(routes.getCategoryServices)
    .then(res => (res.data && {
      categoryServices: prepareCategoryServices(res.data),
    } || {
      categoryServices: [],
    }));
}

export default null;
