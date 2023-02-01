import { UserRepository } from "../repositories";

type User = {
  id?: number;
  email: string;
  password: string;
  username: string;
};

export class UserUseCase {
  public async getAllUsers() {
    const users = await UserRepository().find();

    if (users.length === 0) {
      return false;
    }

    return users;
  }

  public async getUser(id: number) {
    const user = await UserRepository().findBy({ id });
    return user;
  }

  public async createUser(user: User) {
    const newUser = UserRepository().create(user);
    await UserRepository().save(newUser);

    return newUser;
  }

  public async updateUser(id: number, user: User) {
    const verifyUser = await UserRepository().findBy({ id });

    if (verifyUser.length === 0) {
      return false;
    }

    const updatedUser = await UserRepository().save({
      id,
      ...user,
    });

    return updatedUser;
  }

  public async deleteUser(id: number) {
    const verifyUser = await UserRepository().findBy({ id });

    if (verifyUser.length === 0) {
      return false;
    }

    await UserRepository().delete({ id });

    return true;
  }
}
