import routes from '../routes';
import { get } from '../utils/Provider';

import { TDictionaryService, TDictionaryCategoryService } from '../types/Dictionary';

export function getServices() {
  return get(routes.getServices)
    .then(res => (res.data && {
      services: res.data.map(service => ({
        id: Number(service.id),
        key: service.attributes.key,
        title: service.attributes.title,
        categoryId: service.attributes.category_id,
      }: TDictionaryService)),
    } || {
      services: [],
    }));
}

export function getCategoryServices() {
  return get(routes.getCategoryServices)
    .then(res => (res.data && {
      categoryServices: res.data.map(categoryService => ({
        id: Number(categoryService.id),
        key: categoryService.attributes.key,
        parentId: categoryService.attributes.parent_id,
        title: categoryService.attributes.title,
      }: TDictionaryCategoryService)),
    } || {
      categoryServices: [],
    }));
}

export default null;
