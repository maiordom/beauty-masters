import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import find from 'lodash/find';
import { bindActionCreators } from 'redux';

import { drawerClose } from '../actions/Drawer';
import { logout } from '../actions/Auth';

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

const mapDispatchToProps = dispatch => ({
  actions: {
    drawerClose,
    ...bindActionCreators({ logout }, dispatch),
    routeToAuthorization: Actions.masterAuthorization,
    routeToMasterProfile: Actions.masterProfile,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar);
