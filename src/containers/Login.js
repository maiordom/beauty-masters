import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { userLogin } from '../actions/Auth';

import Login from '../components/Login';

const mapStateToProps = (state) => ({
  error: state.auth.loginError,
});

const mapDispatchToProps = (dispatch) => ({
  actions: {
    ...bindActionCreators({ userLogin }, dispatch),
    next: Actions.masterProfile,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Login);
