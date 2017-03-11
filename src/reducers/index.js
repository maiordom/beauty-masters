import masterEditor from './masterEditor';

export default function rootReducer(state, action) {
  state = Object.assign({}, state);
  state = masterEditor(state, action);

  return state;
}
