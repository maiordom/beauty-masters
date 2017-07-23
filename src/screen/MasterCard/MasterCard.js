import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import MasterCard from '../../components/MasterCard/MasterCard';

import type { MasterCardType } from '../../types/MasterTypes';

import { getMasterById } from '../../actions/masterCard';
import { addToFavorites, removeFromFavorites } from '../../actions/favorites';

const mapStateToProps = (state, ownProps) => ({
  ...ownProps,
  scene: state.scene,
  ...state.masterCards[ownProps.id],
  isFavorite: state.favorites.cards.find(card => card.id === ownProps.id) && true,
} : MasterCardType);

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    getMasterById,
    addToFavorites,
    removeFromFavorites,
  }, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(MasterCard);
