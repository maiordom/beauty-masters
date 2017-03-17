import MasterEditor from './MasterEditor';

export default function rootReducer(state, action) {
  state = Object.assign({}, state);
  state = MasterEditor(state, action);

  return state;
}
