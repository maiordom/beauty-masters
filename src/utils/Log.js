export function log() {
  console.log.apply(console, Array.prototype.slice.call(arguments));
};
