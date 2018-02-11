import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import map from 'lodash/map';

import AutocompleteList from '../../components/AutocompleteList';
import NavBar from '../../components/NavBar';

import { getCities, searchCity, selectCity } from '../../actions/Master';

const mapStateToProps = (state, ownProps) => {
  const { cities } = state.masterEditor[ownProps.modelName];
  const source = cities.filtered !== null ? cities.filtered : cities.items;

  return {
    items: map(source, (city) => ({
      ...city,
      label: city.name,
    })),
    searchType: 'press',
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  actions: bindActionCreators({
    selectItem: (city) => () => {
      dispatch(selectCity(city.id, ownProps.modelName));
      Actions.pop();
    },
    searchItemsForText: (value) => searchCity(value, ownProps.modelName),
    resetItems: getCities,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar(AutocompleteList));
