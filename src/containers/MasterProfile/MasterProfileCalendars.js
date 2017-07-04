import { connect } from 'react-redux';

import MasterProfileCalendars from '../../components/MasterProfile/MasterProfileCalendars';

const mapStateToProps = (state) => ({
  salons: state.profile.addresses.map(({ id, salonTitle }) => ({ id, salonTitle })),
});

export default connect(mapStateToProps)(MasterProfileCalendars);
