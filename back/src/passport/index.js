const passport = require('passport');
const local = require('./local');
const { User } = require('../../models');

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user.id); //세션에 유저 id만저장
  });
  //로그인 성공 후 그 다음 요청부터 deserializeUser가 실행
  passport.deserializeUser(async (id, done) => {
    try {
      const user = await User.findOne({ where: { id } }); //메모리에 저장된 id를 찾아서 가져온다.
      done(null, user); //req.user에 저장.
    } catch (error) {
      console.log(error);
      done(null, error);
    }
  });

  local();
};
