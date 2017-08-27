import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import PlacesAutocomplete from '../../components/PlacesAutocomplete';
import NavBar from '../../components/NavBar';

import { searchAddress, addressesReset } from '../../actions/search';

const mapStateToProps = state => ({
  distances: state.searchForm.general.distances,
  addresses: state.searchForm.general.addresses,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    searchAddress,
    addressesReset,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar(PlacesAutocomplete));
