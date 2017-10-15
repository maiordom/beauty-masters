import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Actions } from 'react-native-router-flux';

import NavBar from '../../components/NavBar';
import MasterProfile from '../../components/MasterProfile/MasterProfile';

import { getUserProfile, selectProfileSection } from '../../actions/Profile';

const rightButtonImage = require('../../icons/edit.png');

const mapStateToProps = (state) => ({
  profile: state.profile,
  rightButtonImage,
  sectionKey: state.profile.sectionKey,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ getUserProfile, selectProfileSection }, dispatch),
  onRightButtonPress: () => dispatch((dispatch, getState) => {
    const { sectionKey } = getState().profile;

    switch (sectionKey) {
      case 'info': { Actions.masterEditorGeneral(); } break;
      case 'calendars': { Actions.masterEditorCalendar(); } break;
      case 'services': { Actions.masterEditorService(); } break;
    }
  }),
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar(MasterProfile));
