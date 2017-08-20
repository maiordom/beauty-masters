import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { userCreate } from '../../src/actions/auth';

import Registration from '../components/Registration';

const mapStateToProps = (state) => ({
  error: state.auth.registerError,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ userCreate }, dispatch),
  onAuthSuccess: Actions.masterEditorGeneral,
});

export default connect(mapStateToProps, mapDispatchToProps)(Registration);
