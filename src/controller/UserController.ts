import { Request, Response } from "express";
import { UserUseCase } from "../useCase/userUseCase";

class UserController {
  async getUsers(req: Request, res: Response) {
    const users = await new UserUseCase().getAllUsers();
    res.send(users);
  }

  async getUser(req: Request, res: Response) {
    const { id } = req.params;

    const user = await new UserUseCase().getUser(Number(id));
    res.send(user);
  }

  async createUser(req: Request, res: Response) {
    const { email, username, password } = req.body;

    const newUser = await new UserUseCase().createUser({
      email,
      username,
      password,
    });

    res.send(newUser);
  }

  async updateUser(req: Request, res: Response) {
    const { id } = req.params;
    const { email, username, password } = req.body;

    const updatedUser = await new UserUseCase().updateUser(Number(id), {
      email,
      username,
      password,
    });

    if (!updatedUser) {
      return res.status(404).send({ message: "User not found" });
    }

    res.send(updatedUser);
  }

  async deleteUser(req: Request, res: Response) {
    const { id } = req.params;

    const deletedUser = await new UserUseCase().deleteUser(Number(id));

    if (!deletedUser) {
      return res.status(404).send({ message: "User not found" });
    }

    res.send({ message: "User deleted" });
  }
}

export default new UserController();