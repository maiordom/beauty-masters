import { connect } from 'react-redux';

import RadioGroup from '../components/RadioGroup';

export default connect(state => state.masterSchedule)(RadioGroup);
