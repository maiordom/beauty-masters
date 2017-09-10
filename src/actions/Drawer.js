import { Actions } from 'react-native-router-flux';

export const drawerOpen = props => {
  Actions.refresh({ key: 'drawer', open: true, ...props });
};

export const drawerClose = props => {
  Actions.refresh({ key: 'drawer', open: false, ...props });
};
