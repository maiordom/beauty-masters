import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import map from 'lodash/map';

import AutocompleteList from '../../components/AutocompleteList';
import NavBar from '../../components/NavBar';

import { searchCitySelect, searchCityForText, citiesReset } from '../../actions/Search';
import { setLastMapLocation } from '../../actions/Map';

const mapStateToProps = (state) => {
  const { cities } = state.searchForm.general;
  const source = cities.filtered !== null ? cities.filtered : cities.items;

  return {
    items: map(source, (city) => ({
      ...city,
      label: city.name,
    })),
    searchType: 'press',
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    selectItem: (city) => () => {
      dispatch(searchCitySelect(city.id));
      dispatch(setLastMapLocation({ latitude: city.lat, longitude: city.lon }));
      Actions.pop();
    },
    searchItemsForText: (value) => searchCityForText(value),
    resetItems: citiesReset,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar(AutocompleteList));
