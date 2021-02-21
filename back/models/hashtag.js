module.exports = (sequelize, DataTypes) => {
  const Hashtag = sequelize.define(
    'Hashtag',
    {
      name: {
        type: DataTypes.STRING(20),
        allowNull: false, //필수
      },
    },
    {
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci', //이모티콘저장
    },
  );
  Hashtag.associate = (db) => {};
  return Hashtag;
};
