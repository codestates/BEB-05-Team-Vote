import { Request, Response } from 'express';
const prisma = require('../db/index');

module.exports = {
  userInfo: (req: Request, res: Response) => {
    const user_id = Number(req.query.user_id as String);
    const userInfoHandler = async (user_id: Number) => {
      const userInfo = await prisma.User.findMany({
        where: {
          user_id: user_id,
        },
      });
      return userInfo;
    };
    userInfoHandler(user_id)
      .then(async (result) => {
        await prisma.$disconnect();
        res.status(201).json(result);
      })
      .catch(async (e) => {
        console.error(e);
        await prisma.$disconnect();
        res.status(500).send('Server Error');
      });
  },
};
