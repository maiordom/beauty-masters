import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import SetNewPwd from '../../components/SetNewPwd';
import NavBar from '../../components/NavBar';

import { setNewPwd } from '../../actions/Profile';

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    setNewPwd,
  }, dispatch),
});

export default connect(null, mapDispatchToProps)(NavBar(SetNewPwd));
