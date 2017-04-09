import { AppRegistry } from 'react-native';

import App from './src/containers/App';
import ErrorHandler from './src/utils/error-handler';

ErrorHandler();

AppRegistry.registerComponent('pilochka', () => App);
