import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import find from 'lodash/find';

import { getAddresses } from '../../actions/Profile';

import MasterProfileCalendars from '../../components/MasterProfile/MasterProfileCalendars';

const mapStateToProps = (state) => {
  const card = find(state.profile.masterCards, { isMain: true });

  return {
    uploaded: card.status.addressesUploaded,
    addresses: card.addresses,
  };
};

const mapDispatchToProps = (dispatch: Function) => {
  const actions = bindActionCreators({ getAddresses }, dispatch);

  return {
    actions: {
      getAddresses() {
        dispatch((dispatch, getState) => {
          const card = find(getState().profile.masterCards, { isMain: true });

          actions.getAddresses(card.id);
        });
      },
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MasterProfileCalendars);
