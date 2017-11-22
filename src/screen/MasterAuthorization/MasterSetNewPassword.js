import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import SetNewPassword from '../../components/SetNewPassword';
import NavBar from '../../components/NavBar';

import { setNewPassword } from '../../actions/Profile';

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    setNewPassword,
  }, dispatch),
});

export default connect(null, mapDispatchToProps)(NavBar(SetNewPassword));
