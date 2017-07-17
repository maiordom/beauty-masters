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
    ...Platform.select({
      android: {
        height: 48,
        borderBottomColor: vars.color.borderColorAndroid,
        borderBottomWidth: 1,
        borderTopColor: vars.color.borderColorAndroid,
        borderTopWidth: 1,
      },
    }),
  },
  title: {
    color: vars.color.grey,
    ...Platform.select({
      android: {
        fontSize: 14,
      },
    }),
  },
  icon: {
    marginRight: 10,
    width: 15,
    height: 9,
  },
});

export const arrowIcon = Platform.select({
  android: require('../../icons/android/arrow-up.png'),
});
