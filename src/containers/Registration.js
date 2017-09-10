import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { userCreate } from '../actions/Auth';
import { getUserProfile } from '../actions/Profile';

import Registration from '../components/Registration';

const mapStateToProps = (state) => ({
  error: state.auth.registerError,
});

const mapDispatchToProps = dispatch => {
  const actions = bindActionCreators({ userCreate, getUserProfile }, dispatch);

  return {
    actions: {
      userCreate(params) {
        actions.userCreate(params).then((res) => {
          if (res.result === 'success') {
            actions.getUserProfile();
            Actions.masterEditorGeneral();
          }
        });
      },
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Registration);
