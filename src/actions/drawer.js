import { Actions } from 'react-native-router-flux';

export const drawerOpen = contentKey => {
  Actions.refresh({key: 'drawer', open: true, contentKey: contentKey});
};

export const drawerClose = () => {
  Actions.refresh({key: 'drawer', open: false});
};
