import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import MasterEditorHandlingTools from '../../components/MasterEditor/MasterEditorHandlingTools';
import NavBar from '../../components/NavBar';

import {
  createMasterServices,
  setServiceParam,
  toggleService,
} from '../../actions/Master';

const mapStateToProps = (state) => ({
  cardType: state.masterEditor.cardType,
  modelParamName: 'value',
  models: state.masterEditor.handlingTools,
  queryParamName: 'price',
  sectionName: 'handlingTools',
});

const mapDispatchToProps = (dispatch) => ({
  actions: {
    ...bindActionCreators({
      createMasterServices,
      setServiceParam,
      toggleService,
    }, dispatch),
    routeToCalendars: Actions.masterEditorCalendar,
    routeToProfile: Actions.masterProfile,
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar(MasterEditorHandlingTools));
