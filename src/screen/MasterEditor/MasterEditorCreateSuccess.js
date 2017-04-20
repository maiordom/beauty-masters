import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import MasterEditorCreateSuccess from '../../components/MasterEditor/MasterEditorCreateSuccess';
import NavBar from '../../components/NavBar';

const mapDispatchToProps = () => ({
  onNextPress: Actions.presentation,
});

export default connect(null, mapDispatchToProps)(NavBar(MasterEditorCreateSuccess));
