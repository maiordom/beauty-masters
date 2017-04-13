import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import SearchFormAddress from '../../components/SearchForm/SearchFormAddress';

import { searchAddress, addressesReset } from '../../actions/search';

const mapStateToProps = state => ({
  distances: state.searchForm.general.distances,
  addresses: state.searchForm.general.addresses
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    searchAddress,
    addressesReset
  }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchFormAddress);
