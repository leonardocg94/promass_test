import { Router } from "express";
import {
  createUserController,
  getUserSessionController,
  loginUserController,
} from "./controller";
import { checkTokenMiddleware } from "../common";

const userRouter = Router();

userRouter.post("", createUserController);
userRouter.post("/login", loginUserController);
userRouter.get("", checkTokenMiddleware, getUserSessionController);

export { userRouter };
