export function hexToRgba(hex, opacity = 100){
  const hexValue = hex.replace('#', '');
  const r = parseInt(hexValue.substring(0, 2), 16);
  const g = parseInt(hexValue.substring(2, 4), 16);
  const b = parseInt(hexValue.substring(4, 6), 16);

  return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + opacity / 100 + ')';
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
export function makeReducer(handler, beforeHandler, afterHandler) {
  return (state, action) => {
    let items = handler(state, action);

    beforeHandler && beforeHandler(state, action);

    if (items[action.type]) {
      state = items[action.type]();
    }

    afterHandler && afterHandler(state, action);

    return state;
  };
}

export function formatNumber(number) {
  return String(number).replace(/(\d)(?=(\d\d\d)+([^\d]|$))/g, '$1 ');
}

export function shouldComponentUpdate(ignoreProps, ignoreState) {
  return function (nextProps, nextState) {
    const shallowEqualProps = shallowEqual(this.props, nextProps, ignoreProps);
    const shallowEqualState = shallowEqual(this.state, nextState, ignoreState);

    return !shallowEqualProps.result || !shallowEqualState.result;
  };
}

export function shallowEqual(objA, objB, ignoreKeys) {
  if (objA === objB) {
    return {result: true};
  }

  if (typeof objA !== 'object'
    || objA === null
    || typeof objB !== 'object'
    || objB === null) {
    return {result: false};
  }

  let keysA = Object.keys(objA).filter(key => (ignoreKeys || []).indexOf(key) === -1);
  let keysB = Object.keys(objB).filter(key => (ignoreKeys || []).indexOf(key) === -1);

  if (keysA.length !== keysB.length) {
    return {result: false};
  }

  let bHasOwnProperty = hasOwnProperty.bind(objB);

  for (let i = 0; i < keysA.length; i++) {
    let key = keysA[i];
    let objAProp = objA[key];
    let objBProp = objB[key];

    if (!bHasOwnProperty(keysA[i]) || objAProp !== objBProp) {
      return {
        result: false,
        obj: objA,
        objAProp,
        objBProp,
        key
      };
    }
  }

  return {result: true};
}
