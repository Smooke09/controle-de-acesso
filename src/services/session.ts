import { Request, Response, NextFunction } from "express";
import { UserRepository } from "../repositories";
import { UserUseCase } from "../useCase/userUseCase";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class SessionService {
  static async session(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).send({ message: "Email or password is missing" });
    }

    const checkuser = await UserRepository().findBy({ email });

    if (!checkuser) {
      return res.status(400).send({ message: "User not found" });
    }

    const user = checkuser[0];

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(400).send({ message: "Invalid password" });
    }

    const secret = process.env.SECRET_KEY as string;

    const token = jwt.sign({}, secret, {
      subject: user.id,
    });

    res.send({
      message: "User created successfully",
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
      },
      token,
    });
  }
}

export default SessionService;
