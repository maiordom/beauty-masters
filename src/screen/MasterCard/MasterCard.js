import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import MasterCard from '../../components/MasterCard/MasterCard';

import type { MasterCardType } from '../../types/MasterTypes';

import masterCardData from '../../test/MasterCardData';
import { equipmentInfo } from '../../test/MasterCardData';

const mapStateToProps = (state) => ({
  ...masterCardData,
  equipmentInfo,
  scene: state.scene,
} : MasterCardType);

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(MasterCard);
