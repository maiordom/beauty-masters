// import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Actions } from 'react-native-router-flux';
import { setFieldParam } from '../../actions/search';

import SearchForm from '../../components/SearchForm/SearchForm';

const mapStateToProps = state => {
    console.log(state)
    return {
        serviceManicure: state.searchForm.serviceManicure,
    }
};

const mapDispatchToProps = dispatch => {
    const actions = bindActionCreators({ setFieldParam }, dispatch);

    return {
        // onNextPress: Actions.masterEditorService,
        actions,
    };
};


export default connect(mapStateToProps, mapDispatchToProps)(SearchForm);
