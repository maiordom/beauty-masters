import { Platform, StyleSheet } from 'react-native';
import vars from '../../vars';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    paddingLeft: 15,
    backgroundColor: vars.color.lightGrey,
    justifyContent: 'space-between',
    height: 44,
    paddingRight: 8,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    ...Platform.select({
      android: {
        height: 48,
        borderBottomColor: vars.color.borderColorAndroid,
        borderTopColor: vars.color.borderColorAndroid,
      },
      ios: {
        borderTopColor: vars.color.cellSeparatorColorIOS,
        borderBottomColor: vars.color.cellSeparatorColorIOS,
      },
    }),
  },
  title: {
    color: vars.color.grey,
    ...Platform.select({
      android: {
        fontSize: 14,
      },
      ios: {
        fontSize: 12,
      },
    }),
  },
  icon: {
    marginRight: 10,
    ...Platform.select({
      ios: {
        width: 10,
        height: 6,
      },
      android: {
        width: 15,
        height: 9,
      },
    }),
  },
});

export const arrowIcon = Platform.select({
  android: require('../../icons/android/arrow-up.png'),
  ios: require('../../icons/ios/arrow-up.png'),
});
