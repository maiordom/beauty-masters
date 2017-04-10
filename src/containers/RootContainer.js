import React from 'react';
import { connect } from 'react-redux';

import NavigationRouter from './NavigationRouter';

const RootContainer = () => <NavigationRouter />;

export default connect(null, null)(RootContainer);
