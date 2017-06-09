import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import SerpNavBar from '../../components/Serp/SerpNavBar';
import Serp from '../../components/Serp/Serp';

const mapStateToProps = state => ({
  sceneKey: state.scene.sceneKey,
});

export default connect(mapStateToProps, null)(SerpNavBar(Serp));
