import { connect } from 'react-redux';

import { drawerOpen } from '../../actions/drawer';

import MasterEditorInfo from '../../components/MasterEditor/MasterEditorInfo';

const mapStateToProps = state => ({
  ...state.masterEditor.info,
});

const mapDispatchToProps = () => ({
  drawerOpen,
});

export default connect(mapStateToProps, mapDispatchToProps)(MasterEditorInfo);
