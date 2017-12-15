import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Actions } from 'react-native-router-flux';

import NavBar from '../components/NavBar';
import AutocompleteList from '../components/AutocompleteList';
import {
  getPlaceDetails,
  placesReset,
  searchPlace,
} from '../actions/Geo';

import { setPlaceDetail, setPlaceLocation } from '../actions/Master';

const mapStateToProps = (state) => ({
  items: state.geo.places,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  actions: {
    ...bindActionCreators({
      resetItems: placesReset,
      searchItemsForText: (value) => searchPlace({ input: value }),
      selectItem: (place) => () => {
        getPlaceDetails(place).then(res => {
          dispatch(setPlaceLocation(res.location, ownProps.modelName));
        });
        dispatch(setPlaceDetail(place.label, ownProps.modelName));
        Actions.pop();
      },
    }, dispatch),
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar(AutocompleteList));
