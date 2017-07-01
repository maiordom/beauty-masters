// @flow

import { connect } from 'react-redux';

import NavBar from '../../components/NavBar';
import Feedback from '../../components/Feedback';

const mapStateToProps = (state, ownProps) => ({
  leftButtonMenu: true,
  sceneKey: ownProps.currentScene || state.scene.sceneKey,
});

export default connect(mapStateToProps)(NavBar(Feedback));
