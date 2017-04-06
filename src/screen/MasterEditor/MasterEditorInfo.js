import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { drawerOpen } from '../../actions/drawer';
import { removePhoto } from '../../actions/master';

import MasterEditorInfo from '../../components/MasterEditor/MasterEditorInfo';

const mapStateToProps = state => ({
  ...state.masterEditor.info,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ removePhoto }, dispatch),
  drawerOpen,
});

export default connect(mapStateToProps, mapDispatchToProps)(MasterEditorInfo);
