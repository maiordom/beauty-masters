import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import Registration from '../components/Registration';

const mapDispatchToProps = () => ({
  registerUser() {
    Actions.masterEditor();
  }
});

export default connect(null, mapDispatchToProps)(Registration);
