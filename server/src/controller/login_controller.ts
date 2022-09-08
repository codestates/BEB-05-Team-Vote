import { Request, Response } from "express";
const prisma = require("../db/index");

declare module 'express-session' {
    export interface SessionData {
      user_address: { [key: string]: any };
    }
}

module.exports = {
    user_login : async(req:Request, res:Response, _next:string) => {
    const body = req.body;
    console.log(body)

    const result = await prisma.User.findOne({
        where: {
            user_address: body.user_address
        }
    });
    if (!result) {          
        const { user_address, user_network, user_nickname } = req.body;      
        const loginHandler = async (
            user_address: String,
            user_network: String,
            user_nickname: String
          ) => {
            await prisma.Comment.create({
              data: {
                user_address: user_address,
                user_network: user_network,
                user_nickname: user_address,
              },
            });                  
          };
          loginHandler (user_address, user_network, user_nickname)
            .then(async () => {
              await prisma.$disconnect();
              res.status(201).send("Signup has succeeded");
            })
            .catch(async (e) => {
              console.error(e);
              await prisma.$disconnect();
              res.status(500).send("Server Error");
            });

    } else {
        req.session.user_address = result.user_address;
        res.status(200).json({ data: result, message: '로그인에 성공하였습니다.' })
    }
}
}
