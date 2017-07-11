import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { userCreate } from '../../src/actions/auth';

import Registration from '../components/Registration';

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ userCreate }, dispatch),
  onAuthSuccess: Actions.masterEditorGeneral,
});

export default connect(null, mapDispatchToProps)(Registration);
