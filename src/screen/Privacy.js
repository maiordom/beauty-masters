// @flow

import { connect } from 'react-redux';

import NavBar from '../components/NavBar';
import Doc from '../components/Doc';

const mapStateToProps = (state, ownProps) => ({
  sceneKey: ownProps.currentScene || state.scene && state.scene.sceneKey,
  uri: 'https://docs.google.com/document/d/e/2PACX-1vQWDvPvnrvDHjZgyt5EKPLBBXbP1r7flTipPci75n_kWOu3IGv3sA8Dd_n64RqiCwIACx8JHtbfde-q/pub',
});

export default connect(mapStateToProps)(NavBar(Doc));
