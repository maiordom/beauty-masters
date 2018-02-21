import { Actions } from 'react-native-router-flux';

export const drawerOpen = (props) => {
  Actions.push('drawer', { ...props });
};
