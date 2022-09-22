import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import session from 'express-session';

const Caver = require('caver-js');
const caver = new Caver('https://api.baobab.klaytn.net:8651/%27');


dotenv.config();

const app = express();
const PORT = process.env.PORT;
const articleRouter = require('./router/article');
const commentRouter = require('./router/comment');
const likeRouter = require('./router/like');
const lectureRouter = require('./router/lecture');
const userLectureRouter = require('./router/user_lecture');
const userRouter = require('./router/users');
const profileRouter = require('./router/profile');

app.use(cors({ origin: '*' }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  session({
    secret: 'vote',
    resave: false,
    saveUninitialized: true,
  })
);

app.use('/article', articleRouter);
app.use('/comment', commentRouter);
app.use('/like', likeRouter);
app.use('/lecture', lectureRouter);
app.use('/userlecture', userLectureRouter);
app.use('/user', userRouter);
app.use('/profile', profileRouter);


app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send('Havruta DAO');
});

app.post('/getbalance', async (req, res) => {
  // const balance = await caver.klay.getBalance(req.body.address);
  // const convert = caver.utils.convertFromPeb(balance, 'KLAY');
  const token = new caver.klay.KIP7(
    '0x0ef92ccf7313a4677e0d15fdf01fbb1b5a0a4f05'
  );
  const balance = await token.balanceOf(req.body.address);
  res.status(201).json(balance);

});

app.listen(PORT, () => {
  console.log(`
  ################################################
  🛡️  Server listening on port: ${PORT}🛡️
  ################################################
`);
});
