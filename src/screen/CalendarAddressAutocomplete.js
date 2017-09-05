import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Actions } from 'react-native-router-flux';

import NavBar from '../components/NavBar';
import PlacesAutocomplete from '../components/PlacesAutocomplete';
import {
  getPlaceDetails,
  placesReset,
  searchPlace,
} from '../actions/geo';

import { setPlaceDetail, setPlaceLocation } from '../actions/master';

const mapStateToProps = (state) => ({
  places: state.geo.places,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  actions: {
    ...bindActionCreators({
      placesReset,
      searchPlace: (value) => searchPlace({ input: value }),
      selectPlace: (place) => () => {
        getPlaceDetails(place).then(res => {
          dispatch(setPlaceLocation(res.location, ownProps.modelName));
        });
        dispatch(setPlaceDetail(place.label, ownProps.modelName));
        Actions.pop();
      },
    }, dispatch),
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar(PlacesAutocomplete));
