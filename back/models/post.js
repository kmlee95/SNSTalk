module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    //mysql에 users로 저장
    'Post',
    {
      content: {
        type: DataTypes.TEXT,
        allowNull: false, //필수
      },
    },
    {
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci', //한글저장
    },
  );
  Post.associate = (db) => {
    db.Post.belongsTo(db.User); //포스트는 사람에 포함되어있음.
    db.Post.hasMany(db.Comment);
    db.Post.hasMany(db.Image);
    db.Post.belongsToMany(db.Hashtag, { through: 'PostHashtag' });
    db.Post.belongsToMany(db.User, { through: 'Like', as: 'Likers' }); //좋아요 관계
    db.Post.belongsTo(db.Post, { as: 'Retweet' });
  };
  return Post;
};
