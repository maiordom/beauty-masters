import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import RecoverPassword from '../../components/RecoverPassword';
import NavBar from '../../components/NavBar';

import { recoverPassword } from '../../actions/Profile';

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    recoverPassword,
  }, dispatch),
});

export default connect(null, mapDispatchToProps)(NavBar(RecoverPassword));
