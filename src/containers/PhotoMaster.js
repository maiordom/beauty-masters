import { connect } from 'react-redux';

import { uploadMasterPhoto } from '../actions/master';

import PhotoSelect from '../components/PhotoSelect';

const mapDispatchToProps = dispatch => {
  return {
    onGetPhotoFromCamera(photoData, modelName) {
      dispatch(uploadMasterPhoto(photoData, modelName));
    },

    onGetPhotoFromGallery(photoData, modelName) {
      dispatch(uploadMasterPhoto(photoData, modelName));
    },
  }
};

export default connect(null, mapDispatchToProps)(PhotoSelect);
