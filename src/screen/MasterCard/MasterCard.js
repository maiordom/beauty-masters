import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import MasterCard from '../../components/MasterCard/MasterCard';

import { getMasterById } from '../../actions/MasterCard';
import { addToFavorites, removeFromFavorites } from '../../actions/Favorites';

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  ...state.masterCards[ownProps.id],
  isFavorite: state.favorites.cards.find(card => card.id === ownProps.id) && true,
  scene: state.scene,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    addToFavorites,
    getMasterById,
    removeFromFavorites,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(MasterCard);
