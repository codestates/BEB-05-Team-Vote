import { Request, Response } from 'express';
const prisma = require('../db/index');

module.exports = {
  editProfile: (req: Request, res: Response) => {
    const { user_address, user_nickname, user_introduction } = req.body;
    const editProfileHandler = async (
      user_address: String,
      user_nickname: String,
      user_introduction: String
    ) => {
      await prisma.User.updateMany({
        where: {
          user_address: user_address,
        },
        data: {
          user_nickname: user_nickname,
          user_introduction: user_introduction,
        },
      });

      const userinfo = await prisma.User.findFirst({
        where: {
          user_address: user_address,
        },
        select: {
          user_nickname: true,
          user_introduction: true,
        },
      });

      await prisma.$disconnect();
      res.status(201).json(userinfo);
    };
    editProfileHandler(user_address, user_nickname, user_introduction).catch(
      async (e) => {
        console.error(e);
        await prisma.$disconnect();
        res.status(500).send('Server Error');
      }
    );
  },
};
