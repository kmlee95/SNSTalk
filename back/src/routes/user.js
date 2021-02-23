const express = require('express');
const bcrypt = require('bcrypt');
const passport = require('passport');
const { User } = require('../../models');

const router = express.Router();

router.post('/login', (req, res, next) => {
  //미들웨어 확장
  //여기서 passport전략으로 간다.
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      console.error(err);
      return next(err);
    }
    if (info) {
      return res.status(401).send(info.reason);
    }
    //여기서 serializeUser가 실행
    return req.login(user, async (loginErr) => {
      if (loginErr) {
        console.error(loginErr);
        return next(loginErr);
      }
      return res.status(200).json(user);
    });
  })(req, res, next);
});

router.post('/user/logout', (req, res, next) => {
  req.logout();
  req.session.destroy();
  res.send('ok');
});

router.post('/', async (req, res, next) => {
  //Post /user
  try {
    const exUser = await User.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (exUser) {
      return res.status(403).send('이미 사용중인 아이디입니다.');
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);

    await User.create({
      email: req.body.email,
      nickname: req.body.nickname,
      password: hashedPassword,
    });

    res.send('ok');
  } catch (error) {
    console.error(error);
    next(error); //server error 500
  }
});

module.exports = router;
