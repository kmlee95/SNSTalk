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
/* 1. serialize 와, deserialize 차이 */
// serialize는 직렬화, deserialize는 역직렬화인데요.

// 직렬화라는 것은 어떤 데이터를 다른 곳에서 사용할 수 있게 다른 포맷의 데이터로 바꾸는 것을 의미합니다.
// 지금 패스포트에서는 시퀄라이즈 객체를 세션에 저장할 수 있는 데이터로 바꾸고 있습니다.
// 반대로 역직렬화는 다른 포맷의 데이터로 바뀐 데이터를 원래 포맷으로 복구하는 것입니다.
// 세션에 저장된 데이터를 다시 시퀄라이즈 객체로 바꾸는 작업을 의미합니다.

/* 2. deserialize */
// deserialize에서 복구된 값은 req.body가 아니라 req.user에 들어갑니다. 그리고 deserializeUser는 serializeUser의 user.id를 가져오는 게 아닙니다.
// 세션쿠키를 통해서 메모리에 저장된 id를 찾아서 가져오는 겁니다.
// req.login 시에 serializeUser가 호출되면서 done이 호출될 때 res.setHeader 되는 것이고, 세션쿠키도 그 때 만들어집니다.

/* 결론 */
//브라어주에서 세션쿠키로 세션 id를 찾아 그 세션안에 들어있는 db id를 찾아서 정보를 가져온다.

// 일단 passport.session이 deserializeUser을 실행하지만. deserializeUser는 serializeUser 후에 모든 라우터 접근 시 실행됩니다.
// strategy의 done함수는 passport.authenticate의 콜백함수로 인수들을 넘깁니다.
// serializeUser의 done 함수는 에러가 없을 시 세션에 인수를 저장합니다.
// deserializeUser의 done함수는 req.user을 만듭니다.(에러가 없을 시)
