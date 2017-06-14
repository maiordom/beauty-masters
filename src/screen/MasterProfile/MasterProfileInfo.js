import { connect } from 'react-redux';

import MasterProfileInfo from '../../components/MasterProfile/MasterProfileInfo';
import masterCardData from '../../test/MasterCardData';

const mapStateToProps = () => ({
  ...masterCardData,
});

const mapDispatchToProps = () => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(MasterProfileInfo);
