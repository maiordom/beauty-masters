import { Crashlytics } from 'react-native-fabric';

export function log() {
  console.log.apply(console, Array.prototype.slice.call(arguments));
}

export function sendLog(message: string) {
  try {
    Crashlytics.log(message);
  } catch (exx) {
    log(`Crashlytics::exx::${exx}`);
  }
}
