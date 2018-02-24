// @flow

import { connect } from 'react-redux';

import NavBar from '../components/NavBar';
import Doc from '../components/Doc';

const mapStateToProps = (state, ownProps) => ({
  sceneKey: ownProps.currentScene || state.scene && state.scene.sceneKey,
  uri: 'https://docs.google.com/document/d/e/2PACX-1vTcGKLNEDDaoLLVHuS6JVbrfLERPZ7ntnpDUM3IdMPDvFVY9OhMfrC3R9ADDTIFgVXtERH8MxIDOtCA/pub',
});

export default connect(mapStateToProps)(NavBar(Doc));
