import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import MasterEditorCustomServices from '../components/MasterEditor/MasterEditorCustomServices';

const mapStateToProps = (state, { type} ) => (
  type === 'manicure'
    ? state.masterEditor.services.manicureCustomServices
    : state.masterEditor.services.pedicureCustomServices
);

const mapDispatchToProps = () => ({

});

export default connect(mapStateToProps, mapDispatchToProps)(MasterEditorCustomServices);
