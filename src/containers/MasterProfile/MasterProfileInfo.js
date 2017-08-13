import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import MasterProfileInfo from '../../components/MasterProfile/MasterProfileInfo';

const mapStateToProps = (state) => ({
  ...state.profile,
});

const mapDispatchToProps = (dispatch) => ({
  actions: {
    selectAnotherMaster() {
      Actions.masterProfileSelectProfile();
    },
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MasterProfileInfo);
