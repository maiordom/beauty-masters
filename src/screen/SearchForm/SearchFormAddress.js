import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import AutocompleteList from '../../components/AutocompleteList';
import NavBar from '../../components/NavBar';
import { getPlaceDetails, searchPlace, placesReset } from '../../actions/Geo';
import { setSearchLocation, setSearchLocationName } from '../../actions/Search';

const mapStateToProps = (state) => ({
  items: state.geo.places,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    selectItem: (place) => () => {
      getPlaceDetails(place).then((res) => {
        dispatch(setSearchLocation(res.location.lat, res.location.lng));
        dispatch(setSearchLocationName(place.label));
        Actions.pop();
      });
    },
    searchItemsForText: (value) => searchPlace({ input: value }),
    resetItems: placesReset,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar(AutocompleteList));
