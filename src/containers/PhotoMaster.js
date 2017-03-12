import { connect } from 'react-redux';

import { uploadMasterPersonalPhoto } from '../actions/master';

import PhotoSelect from '../components/PhotoSelect';

const mapDispatchToProps = dispatch => {
  return {
    onGetPhotoFromCamera(photoData, name) {
      dispatch(uploadMasterPersonalPhoto(photoData, name));
    },

    onGetPhotoFromGallery(photoData, name) {
      dispatch(uploadMasterPersonalPhoto(photoData, name));
    },
  }
};

export default connect(null, mapDispatchToProps)(PhotoSelect);
