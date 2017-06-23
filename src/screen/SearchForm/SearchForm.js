import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Actions } from 'react-native-router-flux';
import {
  setDay,
  toogleService,
  setItemById,
  toggleDeparture,
  toggleExtension,
  toggleWithdrawal,
} from '../../actions/search';

import SearchForm from '../../components/SearchForm/SearchForm';
import NavBar from '../../components/NavBar';

const mapStateToProps = state => ({
  ...state.searchForm,
  leftButtonMenu: true,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    setDay,
    toogleService,
    toggleExtension,
    toggleWithdrawal,
    setItemById,
    toggleDeparture,
    onSearchLocation: Actions.masterLocation,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar(SearchForm));
