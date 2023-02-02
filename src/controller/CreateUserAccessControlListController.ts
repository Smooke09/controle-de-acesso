import { Request, Response } from "express";
import { CreateUserAccessControlListService } from "../useCase/CreateUserAccessControlListService";

export class CreateUserAccessControlListController {
  async handle(req: Request, response: Response) {
    const { permissions, roles } = req.body;
    const { userId } = req;

    const createUserACLService = new CreateUserAccessControlListService();

    const result = await createUserACLService.execute({
      userId,
      permissions,
      roles,
    });

    if (result instanceof Error) {
      return response.status(400).json(result.message);
    }

    return response.json(result);
  }
}
