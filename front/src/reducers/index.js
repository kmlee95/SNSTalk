import { HYDRATE } from 'next-redux-wrapper';
import user from './user';
import post from './post';
import { combineReducers } from 'redux';

// 이전상태와 action을 통해 => 다음상태로
const rootReducer = (state, action) => {
  switch (action.type) {
    case HYDRATE:
      return action.payload;
    default: {
      const combinedReducers = combineReducers({
        user,
        post,
      });
      return combinedReducers(state, action);
    }
  }
};

export default rootReducer;
