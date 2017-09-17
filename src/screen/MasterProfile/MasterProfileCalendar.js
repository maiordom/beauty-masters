import { connect } from 'react-redux';
import find from 'lodash/find';

import NavBar from '../../components/NavBar';
import MasterProfileCalendar from '../../components/MasterProfile/MasterProfileCalendar';

const mapStateToProps = (state, ownProps) => {
  const card = find(state.profile.masterCards, { isMain: true });
  const address = find(card.addresses, { id: ownProps.id });

  return address;
};

export default connect(mapStateToProps)(NavBar(MasterProfileCalendar));
