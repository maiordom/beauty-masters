import { connect } from 'react-redux';

import NavBar from '../../components/NavBar';
import MasterProfileCalendar from '../../components/MasterProfile/MasterProfileCalendar';

const mapStateToProps = (state, ownProps) => ({
  salon: state.profile.addresses.find(address => address.id === ownProps.id),
});

export default connect(mapStateToProps)(NavBar(MasterProfileCalendar));
