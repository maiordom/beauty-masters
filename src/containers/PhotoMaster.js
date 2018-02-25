import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { uploadMasterPhoto } from '../actions/Master';

import PhotoSelect from '../components/PhotoSelect';

const mapDispatchToProps = dispatch => ({
  actions: {
    ...bindActionCreators({ uploadMasterPhoto }, dispatch),
  },
});

export default connect(null, mapDispatchToProps)(PhotoSelect);
