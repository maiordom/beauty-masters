import MasterEditor from './MasterEditor';
import SearchForm from './SearchForm';

export default function rootReducer(state, action) {
  state = Object.assign({}, state);
  state = MasterEditor(state, action);
  state = SearchForm(state, action);

  return state;
}
