import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import SearchFormCity from '../../components/SearchForm/SearchFormCity';

import { searchCities, citiesReset } from '../../actions/search';

const mapStateToProps = state => ({
  cities: state.searchForm.general.cities
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    searchCities,
    citiesReset
  }, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchFormCity);
