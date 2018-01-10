import { connect } from 'react-redux';

import MasterLocation from '../../components/MasterCard/MasterLocation';
import NavBar from '../../components/NavBar';

const mapStateToProps = (state) => ({
  initialRegion: (() => {
    if (state.searchForm.general.place.label) {
      return {
        latitude: state.searchForm.searchQuery.lat,
        longitude: state.searchForm.searchQuery.lon,
      };
    }

    const city = state.searchForm.general.cities.selected;
    const { userLocation } = state.geo;

    return userLocation.lat
      ? { latitude: userLocation.lat, longitude: userLocation.lon }
      : { latitude: city.lat, longitude: city.lon };
  })(),
});

export default connect(mapStateToProps, null)(NavBar(MasterLocation));
