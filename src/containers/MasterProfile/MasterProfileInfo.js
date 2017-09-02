import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import find from 'lodash/find';

import MasterProfileInfo from '../../components/MasterProfile/MasterProfileInfo';

const mapStateToProps = (state) => ({
  ...find(state.profile.masterCards, { isMain: true }),
});

const mapDispatchToProps = () => ({
  actions: {
    selectAnotherMaster() {
      Actions.masterProfileSelectProfile();
    },
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MasterProfileInfo);
