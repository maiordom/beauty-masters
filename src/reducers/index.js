import MasterEditor from './MasterEditor';
import SearchForm from './SearchForm';
import Router from './Router';

export default function rootReducer(state, action) {
  state = Object.assign({}, state);
  state = Router(state, action);
  state = MasterEditor(state, action);
  state = SearchForm(state, action);

  return state;
}
