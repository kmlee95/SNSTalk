module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    //mysql에 users로 저장
    'User',
    {
      //id가 기본적으로 들어있음.
      email: {
        type: DataTypes.STRING(30),
        allowNull: false, //필수
        unique: true, //고유값
      },
      nickname: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
    },
    {
      charset: 'utf8',
      collate: 'utf8_general_ci', //한글저장
    },
  );
  User.associate = (db) => {};
  return User;
};
