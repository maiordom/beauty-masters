import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import Login from '../components/Login';

const mapDispatchToProps = () => ({
  loginUser() {
    Actions.masterProfile();
  },
});

export default connect(null, mapDispatchToProps)(Login);
