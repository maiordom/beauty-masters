import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Actions } from 'react-native-router-flux';

import { sendFeedback } from '../../actions/Feedback';

import NavBar from '../../components/NavBar';
import Feedback from '../../components/Feedback';

const mapStateToProps = (state, ownProps) => ({
  leftButtonMenu: true,
  sceneKey: ownProps.currentScene || state.scene && state.scene.sceneKey,
});

const mapDispatchToProps = (dispatch) => ({
  actions: {
    ...bindActionCreators({ sendFeedback }, dispatch),
    routeToSerp: Actions.serp,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar(Feedback));
