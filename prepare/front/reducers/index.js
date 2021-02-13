import { HYDRATE } from 'next-redux-wrapper';
import user from './user';
import post from './post';
import { combineReducers } from 'redux';

// 이전상태와 action을 통해 => 다음상태로
const rootReducer = combineReducers({
  //HYDRATE를 위해 index reducer추가(서버사이드렌더링을 위해)
  index: (state = {}, action) => {
    switch (action.type) {
      case HYDRATE:
        return { ...state, ...action.payload };

      default:
        return state;
    }
  },
  user,
  post,
});

export default rootReducer;
