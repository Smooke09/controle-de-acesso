import { In } from "typeorm";
import { User } from "../database/entities/User";
import {
  PermissionRepository,
  RoleRepository,
  UserRepository,
} from "../repositories";

type UserACLRequest = {
  userId: string;
  roles: string[];
  permissions: string[];
};

type UserACLResponse = User | Error;

export class CreateUserAccessControlListService {
  async execute({ userId, roles, permissions }: UserACLRequest) {
    const repo = UserRepository();

    const user: any = await repo.findOne({
      where: { id: userId },
    });

    if (!user) {
      return new Error("User does not exists!");
    }

    const permissionsExists = await PermissionRepository().findBy({
      id: In(permissions),
    });

    const rolesExists = await RoleRepository().findBy({
      id: In(roles),
    });

    user.permissions = permissionsExists;
    user.roles = rolesExists;

    repo.save(user);

    return user;
  }
}
