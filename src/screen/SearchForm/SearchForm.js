import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Actions } from 'react-native-router-flux';
import {
  setDay,
  setItemById,
  toggleDeparture,
  toggleExtension,
  toggleManicure,
  togglePedicure,
  toggleService,
  toggleWithdrawal,
} from '../../actions/Search';

import SearchForm from '../../components/SearchForm/SearchForm';
import NavBar from '../../components/NavBar';

const mapStateToProps = (state, ownProps) => ({
  ...state.searchForm,
  leftButtonMenu: true,
  sceneKey: ownProps.currentScene || state.scene.sceneKey,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    onSearchLocation: Actions.masterLocation,
    setDay,
    setItemById,
    toggleDeparture,
    toggleExtension,
    toggleManicure,
    togglePedicure,
    toggleService,
    toggleWithdrawal,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar(SearchForm));
