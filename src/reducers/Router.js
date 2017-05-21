import { ActionConst } from 'react-native-router-flux';

import { makeReducer } from '../utils';

export default makeReducer((state, action) => ({
  [ActionConst.FOCUS]: () => ({ ...state, scene: action.scene }),
}));
