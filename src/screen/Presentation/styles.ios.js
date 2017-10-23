import { StyleSheet } from 'react-native';
import commonStyles from './styles.common';

import IOSScreen from '../../utils/IOSScreen';

const iosStyles = {
  ...commonStyles,
  title: {
    ...commonStyles.title,
    fontSize: 17,
    textAlign: 'center',
  },
  logo: {
    ...commonStyles.logo,
    ...IOSScreen.select({
      small: {
        marginBottom: 10,
      },
    }),
  },
  listItem: {
    ...commonStyles.listItem,
    ...IOSScreen.select({
      small: {
        marginTop: 0,
        marginBottom: 15,
      },
    }),
  },
  continueButton: {
    ...commonStyles.continueButton,
    width: 290,
    height: 44,
    borderRadius: 22,
  },
  continueText: {
    ...commonStyles.continueText,
    fontSize: 17,
  },
  authButton: {
    ...commonStyles.authButton,
    height: 56,
    justifyContent: 'center',
  },
  authText: {
    ...commonStyles.authText,
    fontSize: 17,
  },
};

const styles = StyleSheet.create(iosStyles);

export default styles;
