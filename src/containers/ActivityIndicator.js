import { connect } from 'react-redux';

import ActivityIndicator from '../components/ActivityIndicator';

const mapStateToProps = (state, ownProps) => ({
  position: ownProps.position,
  animating: ownProps.animating !== undefined
    ? ownProps.animation
    : state.activityIndicator.animating
});

export default connect(mapStateToProps, null)(ActivityIndicator);
