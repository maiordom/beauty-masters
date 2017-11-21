import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import PlacesAutocomplete from '../../components/PlacesAutocomplete';
import NavBar from '../../components/NavBar';
import { getPlaceDetails, searchPlace, placesReset } from '../../actions/Geo';
import { getLocation } from '../../actions/Common';
import { setSearchLocation, setSearchLocationName } from '../../actions/Search';

const mapStateToProps = (state) => ({
  places: state.geo.places,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    selectPlace: (place) => () => {
      getPlaceDetails(place).then((res) => {
        dispatch(setSearchLocation(res.location.lat, res.location.lng));
        dispatch(setSearchLocationName(place.label));
        Actions.pop();
      });
    },
    searchPlace: (value) => searchPlace({ input: value }),
    placesReset,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar(PlacesAutocomplete));
