import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Actions } from 'react-native-router-flux';
import { setDay, toogleService, setItemById } from '../../actions/search';

import SearchForm from '../../components/SearchForm/SearchForm';

const mapStateToProps = state => ({
  serviceManicure: state.searchForm.serviceManicure,
  servicePedicure: state.searchForm.servicePedicure,
  general: state.searchForm.general,
  searchQuery: state.searchForm.searchQuery
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(
    {
      setDay,
      toogleService,
      setItemById,
      onSearchLocation: Actions.masterLocation
    },
    dispatch
  )
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchForm);
