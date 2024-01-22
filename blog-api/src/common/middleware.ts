import { AuthData, BaseResponse } from "./interfaces";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

//middleware que maneja errores comunes
export const errorHandlerMiddleware = async (
  req: Request,
  res: Response<BaseResponse>
) => {
  console.log({ err: req.err });
  const error = req.err as Error;

  return res.status(400).json({
    success: false,
    error: error?.message,
  });
};

//middleware que revisa que el token fue enviado
export const checkTokenMiddleware = async (
  req: Request,
  res: Response<BaseResponse>,
  next: NextFunction
) => {
  try {
    const token = req.header("auth-token");
    // console.log({ token });
    if (!token)
      return res
        .status(401)
        .json({ success: false, error: "No hay token de sesión" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET_WORD as string);
    // console.log({ decoded });
    if (!decoded)
      return res
        .status(401)
        .json({ success: false, error: "Token de sesión incorrecto" });

    req.authData = decoded as AuthData;
    next();
  } catch (error) {
    const err = error as Error;
    return res.status(401).json({ success: false, error: err.message });
  }
};

export const getTokenIfExistMiddleware = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("auth-token");
  if (token) {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_WORD as string);
    if (decoded) req.authData = decoded as AuthData;
  }
  next();
};
