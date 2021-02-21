const express = require('express');
const app = express();
const postRouter = require('./src/routes/post');
const db = require('./models');

db.sequelize
  .sync()
  .then(() => {
    console.log('db연결성공!');
  })
  .catch(console.error);

app.get('/', (req, res) => {
  res.send('hello express');
});

app.get('/api', (req, res) => {
  res.send('hello express api');
});

app.use('/post', postRouter);

app.listen(3065, () => {
  console.log('서버 실행중');
});
