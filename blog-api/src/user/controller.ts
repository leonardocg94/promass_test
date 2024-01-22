import { NextFunction, Request, Response } from "express";
import {
  CreateUserBody,
  LoginUserBody,
  createUserValidator,
  loginUserValidator,
} from "./validators";
import { BaseResponse } from "../common";
import {
  createUserService,
  getUserSessionService,
  loginUserService,
} from "./service";

//controlador para el servicio de crear usuario
export const createUserController = async (
  req: Request<{}, {}, CreateUserBody>,
  res: Response<BaseResponse>,
  next: NextFunction
) => {
  try {
    const body = await createUserValidator.validate(req.body);
    const createdUser = await createUserService(body);

    return res.status(201).json({
      success: true,
      data: "",
    });
  } catch (error) {
    req.err = error;
    next();
  }
};

//controlador para el servicio de login de usuario
export const loginUserController = async (
  req: Request<{}, {}, LoginUserBody>,
  res: Response<BaseResponse>,
  next: NextFunction
) => {
  try {
    const body = await loginUserValidator.validate(req.body);
    const userData = await loginUserService(body);
    return res.json({ success: true, data: { userData } });
  } catch (error) {
    req.err = error;
    next();
  }
};

//controlador para obtener la sesion de un usuario
export const getUserSessionController = async (
  req: Request,
  res: Response<BaseResponse>,
  next: NextFunction
) => {
  try {
    const user = await getUserSessionService(req.authData!.id);
    return res.json({ success: true, data: { user } });
  } catch (error) {
    req.err = error;
    next();
  }
};
