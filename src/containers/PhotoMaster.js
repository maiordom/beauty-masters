import { connect } from 'react-redux';

import { uploadMasterPersonalPhoto } from '../actions/master';

import PhotoSelect from '../components/PhotoSelect';

const mapDispatchToProps = dispatch => {
  return {
    onGetPhotoFromCamera(photoData) {
      dispatch(uploadMasterPersonalPhoto(photoData));
    },

    onGetPhotoFromGallery(photoData) {
      dispatch(uploadMasterPersonalPhoto(photoData));
    },
  }
};

export default connect(null, mapDispatchToProps)(PhotoSelect);
