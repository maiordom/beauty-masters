import { Crashlytics } from 'react-native-fabric';

export function log() {
  console.log.apply(console, Array.prototype.slice.call(arguments));
}

export function sendLog(message: string) {
  Crashlytics.log(message);
}
