import express from "express";
import UserController from "./controller/UserController";
import PermissionController from "./controller/PermissionController";
import ProductController from "./controller/ProductController";
import RoleController from "./controller/RoleController";

const router = express.Router();

router.get("/users", UserController.getUsers);
router.get("/users/:id", UserController.getUser);
router.post("/users", UserController.createUser);
router.put("/users/:id", UserController.updateUser);
router.delete("/users/:id", UserController.deleteUser);

// Permission routes
router.get("/permissions", PermissionController.getPermissions);
router.get("/permissions/:id", PermissionController.getPermission);
router.post("/permissions", PermissionController.createPermission);
router.put("/permissions/:id", PermissionController.updatePermission);
router.delete("/permissions/:id", PermissionController.deletePermission);

// Product routes
router.get("/products", ProductController.getAllProducts);
router.get("/products/:id", ProductController.getProduct);
router.post("/products", ProductController.createProduct);
router.put("/products/:id", ProductController.updateProduct);
router.delete("/products/:id", ProductController.deleteProduct);

// Role routes
router.get("/roles", RoleController.getAllRoles);
router.get("/roles/:id", RoleController.getRole);
router.post("/roles", RoleController.createRole);
router.put("/roles/:id", RoleController.updateRole);
router.delete("/roles/:id", RoleController.deleteRole);

export default router;
