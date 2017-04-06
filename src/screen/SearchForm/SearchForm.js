// import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Actions } from 'react-native-router-flux';
import {
  toogleService,
  setItemById,
} from '../../actions/search';

import SearchForm from '../../components/SearchForm/SearchForm';

const mapStateToProps = state => {
    return {
        serviceManicure: state.searchForm.serviceManicure,
        servicePedicure: state.searchForm.servicePedicure,
        general: state.searchForm.general
    }
};

const mapDispatchToProps = dispatch => {
    return {
        actions: bindActionCreators({
          toogleService,
            setItemById,
            onSearchLocation: Actions.masterLocation
        }, dispatch)
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(SearchForm);
