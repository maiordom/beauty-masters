import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import SerpNavBar from '../../components/Serp/SerpNavBar';
import Serp from '../../components/Serp/Serp';

const mapStateToProps = state => ({
  sceneKey: state.scene.sceneKey,
});

const mapDispatchToProps = () => ({
  onMapPress() {},
  onListPress() {},
});

export default connect(mapStateToProps, mapDispatchToProps)(SerpNavBar(Serp));
