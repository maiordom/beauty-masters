// @flow

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { getFavorites } from '../../actions/favorites';

import NavBar from '../../components/NavBar';
import Favorites from '../../components/Favorites';

const mapStateToProps = (state, ownProps) => ({
  leftButtonMenu: true,
  sceneKey: ownProps.currentScene || state.scene.sceneKey,
  cards: state.favorites.cards,
  isLoaded: state.favorites.isLoaded,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators({ getFavorites }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(NavBar(Favorites));
