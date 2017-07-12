import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import MasterCard from '../../components/MasterCard/MasterCard';

import type { MasterCardType } from '../../types/MasterTypes';

import { getMasterById } from '../../actions/masterCard';

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  scene: state.scene,
  ...state.masterCards[ownProps.id],
} : MasterCardType);

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ getMasterById }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(MasterCard);
