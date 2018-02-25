import { AppRegistry } from 'react-native';

import App from './src/containers/App';

import { Sentry } from 'react-native-sentry';

if (!__DEV__) {
  Sentry.config('https://0d4864bd72f84d67ac15f4f68b62dfa0:e3962e12634443adb6a47c9cf549bf91@sentry.io/282493').install();
}

AppRegistry.registerComponent('relak', () => App);
