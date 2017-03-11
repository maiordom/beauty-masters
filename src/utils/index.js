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
