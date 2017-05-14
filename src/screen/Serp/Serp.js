import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import SerpNavBar from '../../components/Serp/SerpNavBar';
import Serp from '../../components/Serp/Serp';

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
  }, dispatch),
});

export default connect(null, mapDispatchToProps)(SerpNavBar(Serp));
