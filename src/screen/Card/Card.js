import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Card from '../../components/MasterCard/MasterCard';

const mapStateToProps = () => ({

});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Card);
