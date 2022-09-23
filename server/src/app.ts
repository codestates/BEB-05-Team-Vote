import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import session from 'express-session';
import schedule from 'node-schedule';

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
const nftRouter = require('./router/nft');

const { batchFunction } = require('./controller/batch_controller');

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
app.use('/nft', nftRouter);

app.get('/', (req: Request, res: Response, next: NextFunction) => {
  res.status(200).send('Havruta DAO');
});

app.listen(PORT, () => {
  console.log(`
  ################################################
  🛡️  Server listening on port: ${PORT}🛡️
  ################################################
`);
  schedule.scheduleJob('0 0 0 * * *', function () {
    batchFunction();
  });
});
