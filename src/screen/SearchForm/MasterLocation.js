import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// import { Actions } from 'react-native-router-flux';

import MasterLocation from '../../components/SearchForm/MasterLocation';

const mapStateToProps = state => ({
    ...state.masterEditor.generalSection,
});

const mapDispatchToProps = dispatch => {
    const actions = bindActionCreators({  }, dispatch);

    return {
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(MasterLocation);
