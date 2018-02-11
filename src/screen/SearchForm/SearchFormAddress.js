import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import AutocompleteList from '../../components/AutocompleteList';
import NavBar from '../../components/NavBar';
import { getPlaceDetails, searchPlace, placeSet } from '../../actions/Geo';
import { setSearchLocation, setSearchLocationName } from '../../actions/Search';
import { setLastMapLocation } from '../../actions/Map';

const mapStateToProps = (state) => ({
  items: state.geo.places.items,
  searchType: 'press',
  selected: state.geo.places.selected,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({
    selectItem: (place) => () => {
      getPlaceDetails(place).then((res) => {
        dispatch(setLastMapLocation(null));
        dispatch(setSearchLocation(res.location.lat, res.location.lng));
        dispatch(placeSet(place));
        dispatch(setSearchLocationName(place.label));
        Actions.pop();
      });
    },
    searchItemsForText: (value) => searchPlace({ input: value }),
    resetItems: () => () => {},
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar(AutocompleteList));
