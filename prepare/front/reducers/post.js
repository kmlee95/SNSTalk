export const initialState = {
  mainPosts: [
    {
      id: 1,
      User: {
        id: 1,
        nickname: '제로초',
      },
      content: '첫 번째 게시글 #해시테그 #익스프레스',
      Images: [
        {
          src:
            'https://bookthumb-phinf.pstatic.net/cover/137/995/13799585.jpg?udate=20180726',
        },
        {
          src: 'https://gimg.gilbut.co.kr/book/BN001968/rn_view_BN001968.jpg',
        },
        {
          src: 'https://gimg.gilbut.co.kr/book/BN001998/rn_view_BN001998.jpg',
        },
      ],
      Comments: [
        {
          User: {
            nickname: '네로임',
          },
          content: '우와 개정판이 나왔군요 ~',
        },
        {
          User: {
            nickname: 'kyugmin',
          },
          content: '와우 !!',
        },
      ],
      imagePath: [],
      postAdded: false,
    },
  ],
};

const dummyPost = {
  id: 2,
  User: {
    id: 1,
    nickname: '제로초',
  },
  content: '더미데이터입니다.',
  Images: [],
  Comments: [],
};

const ADD_POST = 'ADD_POST';

export const addPost = {
  type: ADD_POST,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        mainPosts: [dummyPost, ...state.mainPosts],
        postAdded: true,
      };
    default:
      return state;
  }
};

export default reducer;
