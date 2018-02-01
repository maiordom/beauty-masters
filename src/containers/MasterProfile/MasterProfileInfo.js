import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import find from 'lodash/find';

import {
  setGeneralInfo,
  setStatus,
} from '../../actions/MasterEdit';

import MasterProfileInfo from '../../components/MasterProfile/MasterProfileInfo';

const mapStateToProps = (state) => ({
  ...find(state.profile.masterCards, { isMain: true }) || {
    avatar: null,
    email: null,
    phone: null,
    username: null,
  },
});

const mapDispatchToProps = (dispatch: Function) => ({
  actions: {
    selectAnotherMaster: Actions.masterProfileSelectProfile,
    routeToEdit: () => dispatch((dispatch, getState) => {
      const masterCard = find(getState().profile.masterCards, { isMain: true });

      dispatch(setStatus(masterCard.id));
      dispatch(setGeneralInfo(masterCard));

      Actions.masterEditorGeneral();
    }),
    routeToRecoverPassword: Actions.masterRecoverPassword,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(MasterProfileInfo);
