import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import PlacesAutocomplete from '../../components/PlacesAutocomplete';
import NavBar from '../../components/NavBar';

const mapStateToProps = state => ({
  distances: state.searchForm.general.distances.items,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    placesReset: () => ({ type: 'FOO' }),
    searchPlace: () => ({ type: 'FOO' }),
    selectPlace: () => ({ type: 'FOO' }),
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar(PlacesAutocomplete));
