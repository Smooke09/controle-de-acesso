import { Request, Response } from "express";
import { PermissionUseCase } from "../useCase/permissionUseCase";

class PermissionController {
  async getPermissions(req: Request, res: Response) {
    const permissions = await new PermissionUseCase().getAllPermissions();

    if (!permissions) {
      return res.status(404).send({ message: "Permissions not found" });
    }

    res.send({
      message: "Permissions found successfully",
      permissions,
    });
  }

  async getPermission(req: Request, res: Response) {
    const { id } = req.params;

    const permission = await new PermissionUseCase().getPermission(id);

    if (!permission) {
      return res.status(404).send({ message: "Permission not found" });
    }

    res.send({
      message: "Permission found successfully",
      permission,
    });
  }

  async createPermission(req: Request, res: Response) {
    const { name, description } = req.body;

    const permission = await new PermissionUseCase().createPermission({
      name,
      description,
    });

    if (!permission) {
      return res.status(400).send({ message: "Error creating permission" });
    }

    res.send({
      message: "Permission created successfully",
      permission,
    });
  }

  async updatePermission(req: Request, res: Response) {
    const { id } = req.params;
    const { name, description } = req.body;

    const permission = await new PermissionUseCase().updatePermission(id, {
      name,
      description,
    });

    if (!permission) {
      return res.status(400).send({ message: "Error updating permission" });
    }

    res.send({
      message: "Permission updated successfully",
      permission,
    });
  }

  async deletePermission(req: Request, res: Response) {
    const { id } = req.params;

    const permission = await new PermissionUseCase().deletePermission(id);

    if (!permission) {
      return res.status(400).send({ message: "Error deleting permission" });
    }

    res.send({
      message: "Permission deleted successfully",
    });
  }
}

export default new PermissionController();
