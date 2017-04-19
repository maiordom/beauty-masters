import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import MasterEditorCreateSuccess from '../../components/MasterEditor/MasterEditorCreateSuccess';

const mapDispatchToProps = () => ({
  onNextPress: Actions.presentation,
});

export default connect(null, mapDispatchToProps)(MasterEditorCreateSuccess);
