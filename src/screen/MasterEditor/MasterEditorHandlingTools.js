import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import MasterEditorHandlingTools from '../../components/MasterEditor/MasterEditorHandlingTools';
import NavBar from '../../components/NavBar';

import {
  createMasterServices,
  setServiceParam,
  toggleService,
} from '../../actions/master';

const mapStateToProps = state => ({
  modelParamName: 'value',
  models: state.masterEditor.handlingTools,
  queryParamName: 'price',
  sectionName: 'handlingTools',
});

const mapDispatchToProps = dispatch => {
  const actions = bindActionCreators({
    createMasterServices,
    setServiceParam,
    toggleService,
  }, dispatch);

  return {
    actions: {
      ...actions,
      next: () => {
        actions.createMasterServices().then((res) => {
          if (res.result === 'success') {
            Actions.masterEditorCalendar();
          }
        });
      },
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavBar(MasterEditorHandlingTools));
