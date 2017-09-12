import Auth from './Auth';
import Common from './Common';
import Favorites from './Favorites';
import MasterCard from './MasterCard';
import MasterEditor from './MasterEditor';
import MasterEditorService from './MasterEditorService';
import Profile from './Profile';
import Router from './Router';
import SearchForm from './SearchForm';

export default function rootReducer(state, action = {}) {
  state = Object.assign({}, state);
  state = Auth(state, action);
  state = Common(state, action);
  state = Favorites(state, action);
  state = MasterCard(state, action);
  state = MasterEditor(state, action);
  state = MasterEditorService(state, action);
  state = Profile(state, action);
  state = Router(state, action);
  state = SearchForm(state, action);

  if (__DEV__) {
    console.log(`action::${action.type}`);
  }

  return state;
}
