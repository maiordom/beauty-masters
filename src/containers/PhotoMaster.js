import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { uploadMasterPhoto } from '../actions/Master';
import { drawerClose } from '../actions/Drawer';

import PhotoSelect from '../components/PhotoSelect';

const mapDispatchToProps = dispatch => ({
  actions: {
    drawerClose,
    ...bindActionCreators({ uploadMasterPhoto }, dispatch)
  },
});

export default connect(null, mapDispatchToProps)(PhotoSelect);
