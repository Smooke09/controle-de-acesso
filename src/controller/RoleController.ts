import { RoleRepository } from "../repositories";
import { RoleUseCase } from "../useCase/roleUseCase";
import { Request, Response } from "express-serve-static-core";

class RoleController {
  async getAllRoles(req: Request, res: Response) {
    const roles = await new RoleUseCase(RoleRepository()).getRoles();

    if (!roles) {
      return res.status(404).json({
        message: "Roles not found",
      });
    }

    return res.status(200).json(roles);
  }

  async getRole(req: Request, res: Response) {
    const { id } = req.params;

    const role = await new RoleUseCase(RoleRepository(), id).getRole();

    if (!role) {
      return res.status(404).json({
        message: "Role not found",
      });
    }

    return res.status(200).json({
      message: "Role found",
      role,
    });
  }

  async createRole(req: Request, res: Response) {
    const { name, description } = req.body;

    const role = await new RoleUseCase(RoleRepository(), "", {
      name,
      description,
    }).createRole();

    if (!role) {
      return res.status(400).json({
        message: "Role already exists",
      });
    }

    return res.status(201).json({
      message: "Role created",
      role,
    });
  }

  async updateRole(req: Request, res: Response) {
    const { id } = req.params;
    const { name, description } = req.body;

    const role = await new RoleUseCase(RoleRepository(), "", {
      id,
      name,
      description,
    }).updateRole();

    if (!role) {
      return res.status(400).json({
        message: "Role not found",
      });
    }

    return res.status(200).json({
      message: "Role updated",
      role,
    });
  }

  async deleteRole(req: Request, res: Response) {
    const { id } = req.params;

    const role = await new RoleUseCase(RoleRepository(), id).deleteRole();

    if (!role) {
      return res.status(400).json({
        message: "Role not found",
      });
    }

    return res.status(200).json({
      message: "Role deleted",
    });
  }
}

export default new RoleController();
