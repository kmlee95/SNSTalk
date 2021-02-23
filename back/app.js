const express = require('express');
const app = express();
const postRouter = require('./src/routes/post');
const userRouter = require('./src/routes/user');
const passportConfig = require('./src/passport');
const db = require('./models');
const cors = require('cors');

//front에서 보낸 데이터를 req.body에 넣어주는 역활
app.use(express.json());
app.use(express.urlencoded({ extended: true })); //form submit 했을 때 url encoded방식 처리

db.sequelize
  .sync()
  .then(() => {
    console.log('db연결성공!');
  })
  .catch(console.error);

passportConfig();

app.use(
  cors({
    origin: true,
    credentials: false,
  }),
);

app.use('/post', postRouter);
app.use('/user', userRouter);

app.listen(3065, () => {
  console.log('서버 실행중');
});
