import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import MasterLocation from '../../components/MasterCard/MasterLocation';
import NavBar from '../../components/NavBar';

const mapStateToProps = (state) => ({
  initialRegion: (() => {
    if (state.searchForm.general.place.label) {
      return {
        lat: state.searchForm.searchQuery.lat,
        lon: state.searchForm.searchQuery.lon,
      };
    }

    return state.geo.userLocation.lat
      ? state.geo.userLocation
      : { lat: state.geo.city.location.lat, lon: state.geo.city.location.lng };
  })(),
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar(MasterLocation));
