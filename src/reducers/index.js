import MasterEditor from './MasterEditor';
import SearchForm from './SearchForm';
import Router from './Router';
import Common from './Common';
import Profile from './Profile';
import MasterCard from './MasterCard';

export default function rootReducer(state, action = {}) {
  state = Object.assign({}, state);
  state = Router(state, action);
  state = MasterEditor(state, action);
  state = SearchForm(state, action);
  state = Common(state, action);
  state = Profile(state, action);
  state = MasterCard(state, action);

  return state;
}
