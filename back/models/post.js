module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    //mysql에 users로 저장
    'Post',
    {
      //id가 기본적으로 들어있음.
      content: {},
    },
    {
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci', //한글저장
    },
  );
  Post.associate = (db) => {};
  return Post;
};
