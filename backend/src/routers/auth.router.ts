import { Router } from "express";
import { AuthService } from "../services";
import { AuthController } from "../controllers";

export const authRouter = Router();

const authService = new AuthService();
const authController = new AuthController(authService);

authRouter.post("/signup", authController.signup.bind(authController));
authRouter.post("/signin", authController.signin.bind(authController));
authRouter.get("/me", authController.authMe.bind(authController));
authRouter.post("/logout", authController.logout.bind(authController));
