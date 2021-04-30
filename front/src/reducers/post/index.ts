import produce from 'immer';
export interface PostInitailState {}

const initialState: PostInitailState = {};
type ReducerAction = any;
const post = (state: PostInitailState = initialState, action: ReducerAction) => {
  return produce(state, (draft: PostInitailState) => {});
};

export default post;
