const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const { User } = require('../../models');
const bcrypt = require('bcrypt');

module.exports = () => {
  passport.use(
    new LocalStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
      },
      async (email, password, done) => {
        try {
          const user = await User.findOne({
            //이메일 검사
            where: { email },
          });
          if (!user) {
            //이메일 없으면?
            return done(null, false, { reason: '존재하지 않은 이메일입니다!!' }); //서버에러, 성공, 클라이언트에러
          }
          const result = await bcrypt.compare(password, user.password); //이메일이 존재한다면 비밀번호 비교
          if (result) {
            return done(null, user);
          }
          return done(null, false, { reason: '비밀번호가 틀렸습니다' });
        } catch (error) {
          console.error(error);
          return done(error);
        }
      },
    ),
  );
};
