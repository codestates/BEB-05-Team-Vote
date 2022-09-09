import { Request, Response } from "express";

module.exports = {
  user_logout: async (req: Request, res: Response, next: string) => {
    console.log(req.session);
    if (!req.session.user_address) {
      res.status(400).send({ data: null, message: "not authorized" });
    } else {
      req.session.destroy(function (err) {});
      res.status(200).json({ data: null, message: "로그아웃" });
    }
  },
};
