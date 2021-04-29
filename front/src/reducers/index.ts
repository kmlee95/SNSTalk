import { HYDRATE } from 'next-redux-wrapper';
import { combineReducers } from 'redux';
import user, { UserInitialState } from './user';
import post from './post';

export interface RootState {
  user: UserInitialState;
  post: any;
}

//생성된 reducer Input
const rootReducer = (state: RootState, action) => {
  switch (action.type) {
    case HYDRATE:
      return action.payload;
    default: {
      const combinedReducer = combineReducers({ user, post });
      return combinedReducer(state, action);
    }
  }
};

export default rootReducer;
