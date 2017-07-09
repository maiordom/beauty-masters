import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import MasterCard from '../../components/MasterCard/MasterCard';

import type { MasterCardType } from '../../types/MasterTypes';

import { getMasterById } from '../../actions/masterCard';

const mapStateToProps = (state, ownProps) => {
  return ({
    scene: state.scene,
  } : MasterCardType);
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ getMasterById }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(MasterCard);
