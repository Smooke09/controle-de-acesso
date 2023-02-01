import { RoleRepository } from "../repositories";
import BaseClass from "./helpers/baseClass";

type Role = {
  id: string;
  name: string;
  description: string;
};

export class RoleUseCase extends BaseClass {
  constructor(repository: any, id: string = "", obj: Partial<Role> = {}) {
    super(repository, id, obj);
  }

  async getRoles() {
    return await this.get();
  }

  async getRole() {
    return await this.getById();
  }

  async createRole() {
    const verifyRole = await RoleRepository().findBy({ name: this.obj.name });

    if (verifyRole.length > 0) return false;

    return await this.create(this.obj);
  }

  async updateRole() {
    const verifyRole = await RoleRepository().findOneBy({ id: this.obj.id });

    if (!verifyRole) return false;

    return await this.update();
  }

  async deleteRole() {
    const verifyRole = await RoleRepository().findBy({ id: this.id });

    if (verifyRole.length === 0) return false;

    return await this.delete();
  }
}
