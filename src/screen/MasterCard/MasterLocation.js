import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import MasterLocation from '../../components/MasterCard/MasterLocation';
import NavBar from '../../components/NavBar';

const mapStateToProps = (_, ownProps) => ({
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar(MasterLocation));
