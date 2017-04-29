import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { toogleCustomService, setCustomServiceParam } from '../actions/master';

import MasterEditorCustomServices from '../components/MasterEditor/MasterEditorCustomServices';

const mapStateToProps = (state, { type} ) => {
  const servicesModel = type === 'manicure'
    ? state.masterEditor.services.manicureCustomServices
    : state.masterEditor.services.pedicureCustomServices;

  return {
    ...servicesModel,
    sectionName: 'services',
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({ toogleCustomService, setCustomServiceParam }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(MasterEditorCustomServices);
