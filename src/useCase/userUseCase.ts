import { UserRepository } from "../repositories";
import BaseClass from "./helpers/baseClass";

type User = {
  id?: number;
  email: string;
  password: string;
  username: string;
};

export class UserUseCase extends BaseClass {
  constructor(repository: any, id: string = "", obj: Partial<User> = {}) {
    super(repository, id, obj);
  }

  public async getAllUsers() {
    return await this.get();
  }

  public async getUser() {
    return await this.getById();
  }

  public async createUser() {
    const verifyUser = await UserRepository().findOneBy({
      email: this.obj.email,
    });

    if (verifyUser) return false;

    return await this.create(this.obj);
  }

  public async updateUser() {
    const verifyUser = await UserRepository().findOneBy({ id: this.obj.id });

    if (!verifyUser) return false;

    return await this.update();
  }

  public async deleteUser() {
    const verifyUser = await UserRepository().findBy({ id: this.id });

    if (verifyUser.length === 0) return false;

    return await this.delete();
  }
}
