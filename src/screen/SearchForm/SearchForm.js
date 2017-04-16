import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Actions } from 'react-native-router-flux';
import { setDay, toogleService, setItemById, toggleDeparture, toggleExtension } from '../../actions/search';

import SearchForm from '../../components/SearchForm/SearchForm';

const mapStateToProps = state => ({
  ...state.searchForm,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    setDay,
    toogleService,
    toggleExtension,
    setItemById,
    toggleDeparture,
    onSearchLocation: Actions.masterLocation,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchForm);
