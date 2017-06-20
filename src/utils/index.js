// @flow
import find from 'lodash/find';
import groupBy from 'lodash/groupBy';
import capitalize from 'lodash/capitalize';

import type { ProfileData } from '../types/ProfileData';
import type { ServiceDictionary } from '../types/Dictionaries';

export function hexToRgba(hex: string, opacity: number = 100) {
  const hexValue = hex.replace('#', '');
  const r = parseInt(hexValue.substring(0, 2), 16);
  const g = parseInt(hexValue.substring(2, 4), 16);
  const b = parseInt(hexValue.substring(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${opacity / 100})`;
}

/**
 * @param {Function} handler
 * @param {Function} [beforeHandler]
 * @param {Function} [afterHandler]
 * @returns {Function}
 *
 * @example
 * makeReducer((state, action) => ({
 *     [SHOW_FAVORITES]: () => changeModel(state, 'favorites', {isShow: true})
 * }));
 */
export function makeReducer(handler: Function, beforeHandler: Function, afterHandler: Function) {
  return (state, action) => {
    const items = handler(state, action);

    beforeHandler && beforeHandler(state, action);

    if (items[action.type]) {
      state = items[action.type]();
    }

    afterHandler && afterHandler(state, action);

    return state;
  };
}

export function formatNumber(number: number) {
  return String(number).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
}

export function shouldComponentUpdate(ignoreProps: Object, ignoreState: Object) {
  return function (nextProps: Object, nextState: Object) {
    const shallowEqualProps = shallowEqual(this.props, nextProps, ignoreProps);
    const shallowEqualState = shallowEqual(this.state, nextState, ignoreState);

    return !shallowEqualProps.result || !shallowEqualState.result;
  };
}

export function shallowEqual(objA: Object, objB: Object, ignoreKeys: Array<string>) {
  if (objA === objB) {
    return { result: true };
  }

  if (typeof objA !== 'object'
    || objA === null
    || typeof objB !== 'object'
    || objB === null) {
    return { result: false };
  }

  const keysA = Object.keys(objA).filter(key => (ignoreKeys || []).indexOf(key) === -1);
  const keysB = Object.keys(objB).filter(key => (ignoreKeys || []).indexOf(key) === -1);

  if (keysA.length !== keysB.length) {
    return { result: false };
  }

  const bHasOwnProperty = hasOwnProperty.bind(objB);

  for (let i = 0; i < keysA.length; i++) {
    const key = keysA[i];
    const objAProp = objA[key];
    const objBProp = objB[key];

    if (!bHasOwnProperty(keysA[i]) || objAProp !== objBProp) {
      return {
        result: false,
        obj: objA,
        objAProp,
        objBProp,
        key,
      };
    }
  }

  return { result: true };
}

export const capitalizeFirstLetter = (word: string) => `${word.charAt(0).toUpperCase()}${word.slice(1)}`;

/**
 * deepUpdate object by path
 *
 * @param {Object} obj - state for example
 * @param {String} path - dot like path to property
 * @param {Object} changes - new proprety
 *
 * @returns {Object}
 */

export function deepUpdate(obj: Object, path: string, changes: Object) {
  const paths = path.split('.');
  let parentLink = obj;

  paths.forEach(pathItem => {
    parentLink[pathItem] = { ...parentLink[pathItem] };
    parentLink = parentLink[pathItem];
  });

  Object.assign(parentLink, changes);

  return obj;
}

export function getServices(profileData: ProfileData, servicesDictionaries: ServiceDictionary) {
  const masterServices = groupBy(
    profileData.services.map(({ service_id: serviceId, price, duration }) => {
      const { title, parentServiceId } = find(servicesDictionaries, service => service.id === serviceId);

      return { price, duration, title, serviceId, parentServiceId };
    }),
    'parentServiceId',
  );

  const groupedServices = Object.keys(masterServices)
    .map(id => find(servicesDictionaries, service => service.id === Number(id)))
    .map(service => ({
      title: capitalize(service.title),
      id: service.id,
      services: masterServices[service.id].map(_service => ({ ..._service, title: capitalize(_service.title) })),
    }));

  return { services: groupedServices };
}
