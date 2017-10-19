import { StyleSheet } from 'react-native';
import commonStyles from './styles.common';

const iosStyles = {
  ...commonStyles,
  title: {
    ...commonStyles.title,
    fontSize: 17,
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
