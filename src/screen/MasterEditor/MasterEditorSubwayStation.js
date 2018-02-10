import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import map from 'lodash/map';

import AutocompleteList from '../../components/AutocompleteList';
import NavBar from '../../components/NavBar';

import { getSubwayStations, searchSubwayStation, selectSubwayStation } from '../../actions/MasterEdit';
import i18n from '../../i18n';

const mapStateToProps = (state, ownProps) => {
  const { subwayStations } = state.masterEditor[ownProps.modelName];
  const source = subwayStations.filtered !== null ? subwayStations.filtered : subwayStations.items;

  return {
    ...ownProps,
    items: map(source, (station) => ({
      ...station,
      label: station.name,
      description: `${station.line} ${i18n.metroLine}`,
    })),
    searchType: 'press',
  };
};

const mapDispatchToProps = (dispatch, ownProps) => ({
  actions: bindActionCreators({
    selectItem: (station) => () => {
      dispatch(selectSubwayStation(station.id, ownProps.modelName));
      Actions.pop();
    },
    searchItemsForText: (value) => searchSubwayStation(value, ownProps.modelName),
    resetItems: () => getSubwayStations(ownProps.modelName, ownProps.cityId),
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar(AutocompleteList));
