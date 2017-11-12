import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import find from 'lodash/find';

import { drawerClose } from '../actions/Drawer';

import Sidebar from '../components/Sidebar';

const mapStateToProps = (state) => {
  const card = find(state.profile.masterCards, { isMain: true });

  if (card) {
    return {
      username: card.username,
      avatar: card.avatar,
      isAuthorized: true,
    };
  }

  return {
    isAuthorized: false,
  };
};

const mapDispatchToProps = () => ({
  actions: {
    drawerClose,
    routeToAuthorization: Actions.masterAuthorization,
    routeToMasterProfile: Actions.masterProfile,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
