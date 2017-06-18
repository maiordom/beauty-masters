import MasterEditor from './MasterEditor';
import SearchForm from './SearchForm';
import Router from './Router';
import Common from './Common';

export default function rootReducer(state, action) {
  state = Object.assign({}, state);
  state = Router(state, action);
  state = MasterEditor(state, action);
  state = SearchForm(state, action);
  state = Common(state, action);

  return state;
}
