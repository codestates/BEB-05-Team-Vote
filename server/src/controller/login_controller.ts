import { Request, Response } from "express";
import session from "express-session";
import { SessionData } from "express-session";
const prisma = require("../db/index");

declare module "express-session" {
  export interface SessionData {
    user_address: String;
  }
}

module.exports = {
  user_login: async (req: Request, res: Response, _next: string) => {
    const { user_address, user_network } = req.body;

    const result = await prisma.User.findMany({
      where: {
        user_address: user_address,
        user_network: user_network,
      },
    });

    if (result[0] === undefined) {
      const otherAccount = await prisma.User.findMany({
        where: {
          user_address: user_address,
        },
        select: {
          user_nickname: true,
          user_introduction: true,
        },
      });

      if (otherAccount[0] === undefined) {
        const loginHandler = async (
          user_address: String,
          user_network: String
        ) => {
          await prisma.User.create({
            data: {
              user_address: user_address,
              user_network: user_network,
              user_nickname: user_address,
              user_introduction: "",
            },
          });
        };

        loginHandler(user_address, user_network)
          .then(async () => {
            const createdData = await prisma.User.findMany({
              where: {
                user_address: user_address,
                user_network: user_network,
              },
            });
            await prisma.$disconnect();
            req.session.user_address = user_address;
            res
              .status(201)
              .json({ data: createdData, message: "로그인에 성공하였습니다." });
          })
          .catch(async (e) => {
            console.error(e);
            await prisma.$disconnect();
            res.status(500).send("Server Error");
          });
      } else {
        const loginHandler = async (
          user_address: String,
          user_network: String
        ) => {
          await prisma.User.create({
            data: {
              user_address: user_address,
              user_network: user_network,
              user_nickname: otherAccount[0].user_nickname,
              user_introduction: otherAccount[0].user_introduction,
            },
          });
        };

        loginHandler(user_address, user_network)
          .then(async () => {
            const createdData = await prisma.User.findMany({
              where: {
                user_address: user_address,
                user_network: user_network,
              },
            });
            await prisma.$disconnect();
            req.session.user_address = user_address;
            res
              .status(201)
              .json({ data: createdData, message: "로그인에 성공하였습니다." });
          })
          .catch(async (e) => {
            console.error(e);
            await prisma.$disconnect();
            res.status(500).send("Server Error");
          });
      }
    } else {
      req.session.user_address = user_address;
      res
        .status(200)
        .json({ data: result, message: "로그인에 성공하였습니다." });
    }
  },
};
