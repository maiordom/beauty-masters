export function hexToRgba(hex, opacity = 100){
  const hexValue = hex.replace('#', '');
  const r = parseInt(hexValue.substring(0, 2), 16);
  const g = parseInt(hexValue.substring(2, 4), 16);
  const b = parseInt(hexValue.substring(4, 6), 16);

  return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + opacity / 100 + ')';
}
