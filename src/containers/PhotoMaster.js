import { connect } from 'react-redux';

import { uploadMasterPhoto } from '../actions/master';

import PhotoSelect from '../components/PhotoSelect';

const mapDispatchToProps = dispatch => ({
  onGetPhotoFromCamera(data, modelName) {
    dispatch(uploadMasterPhoto(data, modelName));
  },

  onGetPhotoFromGallery(data, modelName) {
    dispatch(uploadMasterPhoto(data, modelName));
  },
});

export default connect(null, mapDispatchToProps)(PhotoSelect);
