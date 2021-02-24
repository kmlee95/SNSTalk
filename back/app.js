const express = require('express');
const cors = require('cors');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const dotenv = require('dotenv');

const postRouter = require('./src/routes/post');
const userRouter = require('./src/routes/user');
const passportConfig = require('./src/passport');
const db = require('./models');

const app = express();
dotenv.config();
//front에서 보낸 데이터를 req.body에 넣어주는 역활
app.use(express.json());
app.use(express.urlencoded({ extended: true })); //form submit 했을 때 url encoded방식 처리
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
  session({
    saveUninitialized: false,
    resave: false,
    secret: process.env.COOKIE_SECRET,
  }),
);
app.use(passport.initialize());
app.use(passport.session());

db.sequelize
  .sync()
  .then(() => {
    console.log('db연결성공!');
  })
  .catch(console.error);

passportConfig();

app.use(
  cors({
    origin: 'http://localhost:3060',
    credentials: true, //쿠키도 전달
  }),
);

app.use('/post', postRouter);
app.use('/user', userRouter);

//보통 에러처리 미들웨어는 숨겨져 있다. next(err)로 실행되는데 바꾸고싶으면 에러처리 미들웨어 따로 만들어준다.

app.listen(3065, () => {
  console.log('서버 실행중');
});
