import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import { userCreate } from '../../src/actions/auth';

import Registration from '../components/Registration';

const mapDispatchToProps = dispatch => ({
  actions: {
    userCreate(params) {
      userCreate(params)(dispatch).then(() => {
        Actions.masterEditorGeneral();
      })
    }
  }
});

export default connect(null, mapDispatchToProps)(Registration);
