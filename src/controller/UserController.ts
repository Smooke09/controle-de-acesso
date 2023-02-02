import { Request, Response } from "express";
import { UserRepository } from "../repositories";
import { UserUseCase } from "../useCase/userUseCase";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

class UserController {
  async getUsers(req: Request, res: Response) {
    const users = await new UserUseCase(UserRepository()).getAllUsers();

    if (!users) {
      return res.status(404).json({
        message: "Users not found",
      });
    }

    res.send({
      message: "Users found successfully",
      users,
    });
  }

  async getUser(req: Request, res: Response) {
    const { id } = req.params;

    const user = await new UserUseCase(UserRepository(), id).getUser();

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.send({
      message: "User found successfully",
      user,
    });
  }

  async createUser(req: Request, res: Response) {
    const { email, username, password } = req.body;

    const secret = process.env.SECRET_KEY as string;

    const user = await new UserUseCase(UserRepository(), "", {
      email,
      username,
      password: bcrypt.hashSync(password, 10),
    }).createUser();

    const token = jwt.sign({ subject: user.id }, secret, {
      expiresIn: "1h",
    });

    res.send({
      message: "User created successfully",
      user: {
        id: user.id,
        email: user.email,
        username: user.username,
        token,
      },
    });
  }

  async updateUser(req: Request, res: Response) {
    const { id } = req.params;
    const { email, username, password } = req.body;

    const user = await new UserUseCase(UserRepository(), id, {
      email,
      username,
    }).updateUser();

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    res.send({
      message: "User updated successfully",
      user,
    });
  }

  async deleteUser(req: Request, res: Response) {
    const { id } = req.params;

    const user = await new UserUseCase(UserRepository(), id).deleteUser();

    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }

    res.send({ message: "User deleted" });
  }
}

export default new UserController();
