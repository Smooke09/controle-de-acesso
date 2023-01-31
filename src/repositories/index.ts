import { AppDataSource } from "../data-source";
import { Permission } from "../database/entities/Permission";
import { Product } from "../database/entities/Product";
import { Role } from "../database/entities/Role";
import { User } from "../database/entities/User";

export const UserRepository = () => {
  return AppDataSource.getRepository(User);
};

export const RoleRepository = () => {
  return AppDataSource.getRepository(Role);
};

export const PermissionRepository = () => {
  return AppDataSource.getRepository(Permission);
};

export const ProductRepository = () => {
  return AppDataSource.getRepository(Product);
};
