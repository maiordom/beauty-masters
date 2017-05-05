import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Card from '../../components/Card/Card';

const mapStateToProps = () => ({

});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Card);
