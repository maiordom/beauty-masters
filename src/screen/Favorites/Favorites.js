// @flow

import { connect } from 'react-redux';

import NavBar from '../../components/NavBar';
import Favorites from '../../components/Favorites';

const mapStateToProps = () => ({
  leftButtonMenu: true,
});

export default connect(mapStateToProps)(NavBar(Favorites));
