// @flow
import { Dimensions } from 'react-native';

const SMALL_SCREEN_HEIGHT = 480;
const MEDIUM_SCREEN_HEIGHT = 568;

const IOSScreen = {
  select(o: Object): Object {
    const screenHeight = Dimensions.get('window').height;
    if (screenHeight <= SMALL_SCREEN_HEIGHT) {
      return o.small;
    } else if (screenHeight <= MEDIUM_SCREEN_HEIGHT) {
      return o.medium;
    } else {
      return o.large;
    }
  },
};

export default IOSScreen;
