import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { drawerOpen } from '../../actions/drawer';
import { removePhoto, createMaster } from '../../actions/master';

import MasterEditorInfo from '../../components/MasterEditor/MasterEditorInfo';
import NavBar from '../../components/NavBar';

const mapStateToProps = state => ({
  ...state.masterEditor.info,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ removePhoto, createMaster }, dispatch),
  drawerOpen,
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar(MasterEditorInfo));
