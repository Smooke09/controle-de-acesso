import { Request, Response, NextFunction } from "express";
import { UserRepository } from "../repositories";

// Verificando se o usuário possui uma das permissões permitidas
export function can(permissionsRoutes: string[]) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req;

    const user = await UserRepository().findOne({
      where: { id: userId },
      relations: ["permissions"],
    });

    if (!user) {
      return res.status(401).json({ error: "User not found" });
    }

    const permissionsExists = user.permissions
      .map((permission) => permission.name)
      .some((permission) => permissionsRoutes.includes(permission));

    console.log(permissionsExists);

    if (!permissionsExists) {
      return res.status(401).json({ error: "User not authorized" });
    }

    return next();
  };
}

// Verificando se o usuário possui uma das roles permitidas
export function is(rolesRoutes: string[]) {
  return async (request: Request, response: Response, next: NextFunction) => {
    const { userId } = request;

    const user = await UserRepository().findOne({
      where: { id: userId },
      relations: ["roles"],
    });

    if (!user) {
      return response.status(400).json("User does not exists");
    }

    const roleExists = user.roles
      .map((role) => role.name)
      .some((role) => rolesRoutes.includes(role));

    if (!roleExists) {
      return response.status(401).end();
    }

    return next();
  };
}
