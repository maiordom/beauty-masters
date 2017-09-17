import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import find from 'lodash/find';

import { getMasterServices } from '../../actions/Profile';

import MasterProfileServices from '../../components/MasterProfile/MasterProfileServices';

const mapStateToProps = (state) => {
  const card = find(state.profile.masterCards, { isMain: true });

  return {
    uploaded: card.status.masterServicesUploaded,
    services: card.masterServices,
  };
};

const mapDispatchToProps = (dispatch: Function) => {
  const actions = bindActionCreators({ getMasterServices }, dispatch);

  return {
    actions: {
      getMasterServices() {
        dispatch((dispatch, getState) => {
          const card = find(getState().profile.masterCards, { isMain: true });

          actions.getMasterServices(card.id);
        });
      },
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MasterProfileServices);
