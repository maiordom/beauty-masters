// @flow

import { connect } from 'react-redux';

import NavBar from '../../components/NavBar';
import UserAgreement from '../../components/UserAgreement';

const mapStateToProps = (state, ownProps) => ({
  leftButtonMenu: true,
  sceneKey: ownProps.currentScene || state.scene.sceneKey,
});

export default connect(mapStateToProps)(NavBar(UserAgreement));
