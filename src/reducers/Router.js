import { ActionConst } from 'react-native-router-flux';

import { makeReducer } from '../utils';

export default makeReducer((state, action) => ({
  [ActionConst.FOCUS]: () => {
    console.log('dispatched action');
    console.log(action.scene);
    return { ...state, scene: action.scene };
  },
}));
