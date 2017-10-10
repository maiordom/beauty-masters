import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import RecoverPwd from '../../components/RecoverPwd';
import NavBar from '../../components/NavBar';

import { recoverPwd } from '../../actions/Profile';

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    // recoverPwd,
  }, dispatch),
});

export default connect(null, mapDispatchToProps)(NavBar(RecoverPwd));
