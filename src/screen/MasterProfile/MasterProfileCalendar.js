import { connect } from 'react-redux';

import NavBar from '../../components/NavBar';
import MasterProfileCalendar from '../../components/MasterProfile/MasterProfileCalendar';

import masterCardData from '../../test/MasterCardData';

const selectedId = 19; // fot test case

const mapStateToProps = (state, ownProps) => ({
  salon: masterCardData.addresses.find(address => address.id === selectedId),
});

const mapDispatchToProps = () => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar(MasterProfileCalendar));
