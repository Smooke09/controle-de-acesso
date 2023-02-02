import express from "express";
import UserController from "./controller/UserController";
import PermissionController from "./controller/PermissionController";
import ProductController from "./controller/ProductController";
import RoleController from "./controller/RoleController";
import { ensureAuthenticated } from "./middleware/ensureauthenticated";
import SessionService from "./services/session";
import { CreateUserAccessControlListController } from "./controller/CreateUserAccessControlListController";
import { CreateRolePermissionController } from "./controller/CreateRolePermissionController";
import { can, is } from "./middleware/permissions";

const router = express.Router();

router.post("/login", SessionService.session);

// User routes
router.get("/users", UserController.getUsers);
router.get("/users/:id", UserController.getUser);
router.post("/users", UserController.createUser);
router.put("/users/:id", UserController.updateUser);
router.delete("/users/:id", UserController.deleteUser);

// Permission routes
router.get("/permissions", PermissionController.getPermissions);
router.get("/permissions/:id", PermissionController.getPermission);
router.post(
  "/permissions",
  ensureAuthenticated(),
  PermissionController.createPermission
);
router.put(
  "/permissions/:id",
  ensureAuthenticated(),
  PermissionController.updatePermission
);
router.delete(
  "/permissions/:id",
  ensureAuthenticated(),
  PermissionController.deletePermission
);

// Product routes
router.get("/products", ProductController.getAllProducts);
router.get("/products/:id", ProductController.getProduct);
router.post(
  "/products",
  ensureAuthenticated(),
  can(["create_product"]),
  ProductController.createProduct
);
router.put(
  "/products/:id",
  ensureAuthenticated(),
  ProductController.updateProduct
);
router.delete(
  "/products/:id",
  ensureAuthenticated(),
  ProductController.deleteProduct
);

// Role routes
router.get("/roles", RoleController.getAllRoles);
router.get("/roles/:id", RoleController.getRole);
router.post("/roles", is(["admin"]), RoleController.createRole);
router.put("/roles/:id", RoleController.updateRole);
router.delete("/roles/:id", RoleController.deleteRole);

// ACL routes
router.post(
  "/users/acl",
  ensureAuthenticated(),
  new CreateUserAccessControlListController().handle
);

router.post("/roles/:roleId", new CreateRolePermissionController().handle);

export default router;
