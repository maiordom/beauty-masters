import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import PlacesAutocomplete from '../../components/PlacesAutocomplete';
import NavBar from '../../components/NavBar';
import { searchPlace, placesReset } from '../../actions/Geo';
import { getLocation } from '../../actions/Common';
import { setSearchLocation, setSearchLocationName } from '../../actions/Search';

const mapStateToProps = state => ({
  places: state.geo.places,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    searchPlace,
    setSearchLocation,
    setSearchLocationName,
    placesReset,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar(PlacesAutocomplete));
