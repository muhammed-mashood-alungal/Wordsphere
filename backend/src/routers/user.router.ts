import { Router } from "express";
import { UserService } from "../services";
import { UserController } from "../controllers";
import { authMiddleware,adminAuthMiddleware } from "../middlewares";

export const userRouter = Router();

const userService = new UserService();
const userController = new UserController(userService);

userRouter.get(
  "/me",
  authMiddleware,
  userController.getUserData.bind(userController)
);
userRouter.get(
  "/",
  authMiddleware,
  adminAuthMiddleware,
  userController.getAllUsers.bind(userController)
);
userRouter.put(
  "/change-password",
  authMiddleware,
  userController.changePassword.bind(userController)
);
userRouter.get(
  "/:userId",
  authMiddleware,
  userController.getUserById.bind(userController)
);
userRouter.put(
  "/:userId",
  authMiddleware,
  userController.updateUser.bind(userController)
);
userRouter.delete(
  "/:userId",
  authMiddleware,
  adminAuthMiddleware,
  userController.deleteUser.bind(userController)
);
userRouter.patch(
  "/:userId/restore",
  authMiddleware,
  adminAuthMiddleware,
  userController.restoreUser.bind(userController)
);
