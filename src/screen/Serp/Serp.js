import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import SerpNavBar from './SerpNavBar';
import Serp from '../../components/Serp/Serp';

const mapStateToProps = () => ({

});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SerpNavBar(Serp));
