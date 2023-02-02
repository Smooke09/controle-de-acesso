import { Request, Response, NextFunction } from "express";
import { decode, verify } from "jsonwebtoken";

export const ensureAuthenticated = () => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).send({ message: "Token is missing" });
    }

    const token = authHeader;

    try {
      verify(token, process.env.SECRET_KEY as string);

      const { sub }: any = decode(token);

      req.userId = sub.toString();

      return next();
    } catch (err) {
      return res.status(401).send({ message: "Invalid token" });
    }
  };
};
