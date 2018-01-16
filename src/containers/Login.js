import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { userLogin } from '../actions/Auth';
import { getUserProfile } from '../actions/Profile';

import Login from '../components/Login';

const mapStateToProps = (state) => ({
  error: state.auth.loginError,
});

const mapDispatchToProps = (dispatch) => {
  const actions = bindActionCreators({ userLogin, getUserProfile }, dispatch);

  return {
    actions: {
      userLogin(params) {
        return actions.userLogin(params).then((res) => {
          if (res.result === 'success') {
            actions.getUserProfile().then((res) => {
              if (res.error) {
                return;
              }

              res.masterCards.length
                ? Actions.masterProfile()
                : Actions.masterEditorGeneral();
            });
          }

          return res;
        });
      },
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
