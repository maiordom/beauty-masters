import { StyleSheet } from 'react-native';
import commonStyles from './styles.common';

import vars from '../../vars';
import { hexToRgba } from '../../utils';

const androidStyles = {
  ...commonStyles,
  title: {
    ...commonStyles.title,
    fontSize: 18,
  },
  text: {
    ...commonStyles.text,
    fontSize: 16,
  },
  continueButton: {
    ...commonStyles.continueButton,
    width: 280,
    height: 48,
    borderRadius: 24,
  },
  authButton: {
    ...commonStyles.authButton,
    marginTop: 20,
    height: 48,
    justifyContent: 'center',
    borderTopWidth: 1,
    borderTopColor: hexToRgba(vars.color.white, 30),
  },
};

const styles = StyleSheet.create(androidStyles);

export default styles;
