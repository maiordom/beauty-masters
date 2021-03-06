import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Platform } from 'react-native';
import { Actions } from 'react-native-router-flux';
import find from 'lodash/find';

import NavBar from '../../components/NavBar';
import MasterProfile from '../../components/MasterProfile/MasterProfile';

import { getUserProfile, selectProfileSection } from '../../actions/Profile';
import {
  setCalendars,
  setGeneralInfo,
  setHandlingTools,
  setHomeAllowance,
  setManicureServices,
  setPedicureServices,
  setStatus,
} from '../../actions/MasterEdit';
import { refreshEditor } from '../../actions/Master';

const rightButtonImage = Platform.select({
  android: require('../../icons/android/edit.png'),
  ios: require('../../icons/ios/edit.png'),
});

const mapStateToProps = (state) => ({
  profile: state.profile,
  rightButtonImage,
  sectionKey: state.profile.sectionKey,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ getUserProfile, selectProfileSection }, dispatch),
  onLeftButtonPress: () => {
    Actions.searchForm();
  },
  onRightButtonPress: () => dispatch((dispatch, getState) => {
    const { sectionKey } = getState().profile;
    const masterCard = find(getState().profile.masterCards, { isMain: true });

    switch (sectionKey) {
      case 'info': {
        dispatch(refreshEditor());
        dispatch(setStatus(masterCard.id));
        dispatch(setGeneralInfo(masterCard));
        Actions.masterEditorGeneral();
      } break;
      case 'calendars': {
        dispatch(refreshEditor());
        dispatch(setStatus(masterCard.id));
        dispatch(setCalendars(masterCard));
        Actions.masterEditorCalendar();
      } break;
      case 'services': {
        dispatch(refreshEditor());
        dispatch(setStatus(masterCard.id));
        dispatch(setHomeAllowance(masterCard));
        dispatch(setManicureServices(masterCard));
        dispatch(setPedicureServices(masterCard));
        dispatch(setHandlingTools(masterCard));
        Actions.masterEditorService();
      } break;
    }
  }),
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar(MasterProfile));
