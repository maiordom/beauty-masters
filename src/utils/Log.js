import { Crashlytics } from 'react-native-fabric';

export function log() {
  const args = Array.prototype.slice.call(arguments);

  if (!__DEV__) {
    args.forEach((arg, index) => {
      if (typeof arg === 'object') {
        args[index] = JSON.stringify(arg);
      }
    });
  }

  console.log(...args);
}

export function sendLog(message: string) {
  try {
    Crashlytics.log(message);
  } catch (exx) {
    log(`Crashlytics::exx::${exx}`);
  }
}
