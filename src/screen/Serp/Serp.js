import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import SerpNavBar from '../../components/Serp/SerpNavBar';
import Serp from '../../components/Serp/Serp';

const mapStateToProps = state => ({
  sceneKey: state.scene.sceneKey,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SerpNavBar(Serp));
