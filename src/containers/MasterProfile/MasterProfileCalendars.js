import { connect } from 'react-redux';
import find from 'lodash/find';

import MasterProfileCalendars from '../../components/MasterProfile/MasterProfileCalendars';

const mapStateToProps = (state) => {
  const card = find(state.profile.masterCards, { isMain: true });

  console.log(card);

  return {
    addresses: card && card.addresses || [],
  };
};

export default connect(mapStateToProps)(MasterProfileCalendars);
