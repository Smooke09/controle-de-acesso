import { PermissionRepository } from "../repositories";
import BaseClass from "./helpers/baseClass";

type Permission = {
  id: string;
  name: string;
  description: string;
};

export class PermissionUseCase extends BaseClass {
  constructor(repository: any, id: string = "", obj: Partial<Permission> = {}) {
    super(repository, id, obj);
  }

  async getAllPermissions() {
    return await this.get();
  }

  async getPermission() {
    return await this.getById();
  }

  async createPermission() {
    const verifyPermission = await PermissionRepository().findBy({
      name: this.obj.name,
    });

    if (verifyPermission.length > 0) {
      return false;
    }

    return await this.create(this.obj);
  }

  async updatePermission() {
    const verifyPermission = await PermissionRepository().findOneBy({
      id: this.obj.id,
    });

    if (!verifyPermission) return false;

    return await this.update();
  }

  async deletePermission() {
    const verifyPermission = await PermissionRepository().findBy({
      id: this.id,
    });

    if (verifyPermission.length === 0) return false;

    return await this.delete();
  }
}
